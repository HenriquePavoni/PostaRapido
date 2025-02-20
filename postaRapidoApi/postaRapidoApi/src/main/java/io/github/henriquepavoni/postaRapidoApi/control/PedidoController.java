package io.github.henriquepavoni.postaRapidoApi.control;

import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import io.github.henriquepavoni.postaRapidoApi.model.Pedido;
import io.github.henriquepavoni.postaRapidoApi.model.PedidoDTO;
import io.github.henriquepavoni.postaRapidoApi.repository.ClienteRepository;
import io.github.henriquepavoni.postaRapidoApi.repository.PedidoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import io.github.henriquepavoni.postaRapidoApi.util.ConverterStringToBigDecimal;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@Validated
@CrossOrigin("http://localhost:4200")
public class PedidoController {

  private final PedidoRepository repository;
  private final ClienteRepository clienteRepository;
  private final ConverterStringToBigDecimal converter;

  @GetMapping
  public List<Pedido> buscaTodosClientes() {
    return repository.findAll();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Pedido save(@RequestBody @Valid PedidoDTO pedidoDTO) {

    Cliente cliente = clienteRepository
      .findById(pedidoDTO.idCliente())
      .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

    Pedido pedido = new Pedido(pedidoDTO);
    pedido.setCliente(cliente);
    pedido.setValor(converter.converter(pedidoDTO.valor()));

    return repository.save(pedido);
  }

  @GetMapping("{id}")
  public Pedido buscaPorId(@PathVariable Integer id) {
    return repository.findById(id)
      .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletar(@PathVariable Integer id) {

    repository.findById(id)
      .map( pedido -> {
        repository.delete(pedido);
        return Void.TYPE;
      })
      .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
  }

  @PutMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void atualizar(@PathVariable Integer id, @RequestBody @Valid PedidoDTO dto) {

    Pedido pedido = new Pedido(dto);

    repository.findById(id)
      .map( tempPedido -> {
        pedido.setId(tempPedido.getId());
        pedido.setCliente(tempPedido.getCliente());
        return repository.save(pedido);
      })
      .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
  }
}
