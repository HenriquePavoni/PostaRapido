package io.github.henriquepavoni.postaRapidoApi.control;



import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import io.github.henriquepavoni.postaRapidoApi.model.Pedido;
import io.github.henriquepavoni.postaRapidoApi.model.PedidoDTO;
import io.github.henriquepavoni.postaRapidoApi.repository.ClienteRepository;
import io.github.henriquepavoni.postaRapidoApi.repository.PedidoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
@RestController
@RequestMapping("/api/pedido")
public class PedidoController {
  private final PedidoRepository pedidoRepository;
  private final ClienteRepository clienteRepository;

  @Autowired
  public PedidoController(PedidoRepository pedidoRepository, ClienteRepository clienteRepository) {
    this.pedidoRepository = pedidoRepository;
    this.clienteRepository = clienteRepository;
  }

  @GetMapping
  public List<Pedido> buscaTodosPedidos() {
    return pedidoRepository.findAll();
  }

  @GetMapping("/filtro")
  public List<Pedido> buscaPedidosFiltro(
    @RequestParam(value = "nomeCliente", required = false, defaultValue = "") String nomeCliente,
    @RequestParam(value = "statusPedido", required = false, defaultValue = "") String statusPedido
  ) {
    return pedidoRepository.findByNomeClienteOrStatus("%"+nomeCliente+"%", statusPedido);
  }

  @GetMapping("{id}")
  public Pedido buscaPorId(@PathVariable Integer id) {

    return pedidoRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));

  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  public Pedido salvaPedido(@RequestBody @Valid PedidoDTO pedidoDTO) {
    Cliente cliente = clienteRepository.findById(pedidoDTO.cliente().getId())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

    Pedido pedido = new Pedido(pedidoDTO);
    pedido.setValor(pedidoDTO.valor());
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
  @ResponseStatus(HttpStatus.OK)
  public Pedido updatePedido(@PathVariable Integer id, @RequestBody PedidoDTO pedidoDTO) {
    Cliente cliente = clienteRepository.findById(pedidoDTO.cliente().getId())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

    return pedidoRepository.findById(id).map(tempPedido -> {
      Pedido pedido = new Pedido(pedidoDTO);
      pedido.setId(tempPedido.getId());
      pedido.setValor(pedidoDTO.valor());
      pedido.setCliente(cliente);
      return pedidoRepository.save(pedido);
    }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
  }
}
