package io.github.henriquepavoni.postaRapidoApi.control;



import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import io.github.henriquepavoni.postaRapidoApi.model.Pedido;
import io.github.henriquepavoni.postaRapidoApi.model.PedidoDTO;
import io.github.henriquepavoni.postaRapidoApi.repository.ClienteRepository;
import io.github.henriquepavoni.postaRapidoApi.repository.PedidoRepository;
import io.github.henriquepavoni.postaRapidoApi.util.ConverterStringToBigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
@RestController
@RequestMapping("/api/pedido")
@Validated
@CrossOrigin("http://localhost:4200")
public class PedidoController {
  private final PedidoRepository pedidoRepository;
  private final ClienteRepository clienteRepository;
  private final ConverterStringToBigDecimal conversorBigDecimal;

  @Autowired
  public PedidoController(PedidoRepository pedidoRepository, ClienteRepository clienteRepository,
                          ConverterStringToBigDecimal conversorBigDecimal) {
    this.pedidoRepository = pedidoRepository;
    this.clienteRepository = clienteRepository;
    this.conversorBigDecimal = conversorBigDecimal;
  }

  @GetMapping
  public List<Pedido> buscaTodosPedidos() {
    return pedidoRepository.findAll();
  }

  @GetMapping("{id}")
  public Pedido buscaPorId(@PathVariable Integer id) {
    return pedidoRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  public Pedido salvaPedido(@RequestBody PedidoDTO pedidoDTO) {
    Cliente cliente = clienteRepository.findById(pedidoDTO.idCliente())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

    Pedido pedido = new Pedido(pedidoDTO);
    BigDecimal valorDecimal = conversorBigDecimal.converter(pedidoDTO.valor());
    pedido.setValor(valorDecimal);
    pedido.setCliente(cliente);

    return pedidoRepository.save(pedido);
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletePedido(@PathVariable Integer id) {
    pedidoRepository.findById(id).map(pedido -> {
      pedidoRepository.delete(pedido);
      return Void.TYPE;
    }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
  }

  @PutMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updatePedido(@PathVariable Integer id, @RequestBody PedidoDTO pedidoDTO) {
    Cliente cliente = clienteRepository.findById(pedidoDTO.idCliente())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

    Pedido pedido = new Pedido(pedidoDTO);

    pedidoRepository.findById(id).map(tempPedido -> {
      pedido.setId(tempPedido.getId());
      BigDecimal valorDecimal = conversorBigDecimal.converter(pedidoDTO.valor());
      pedido.setValor(valorDecimal);
      pedido.setCliente(cliente);
      pedidoRepository.save(pedido);
      return Void.TYPE;
    }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
  }
}
