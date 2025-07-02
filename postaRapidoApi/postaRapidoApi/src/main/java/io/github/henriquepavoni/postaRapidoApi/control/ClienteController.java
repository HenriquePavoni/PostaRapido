package io.github.henriquepavoni.postaRapidoApi.control;

import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import io.github.henriquepavoni.postaRapidoApi.model.ClienteDTO;
import io.github.henriquepavoni.postaRapidoApi.repository.ClienteRepository;
import io.github.henriquepavoni.postaRapidoApi.service.ServiceCliente;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository repository;
    private final ServiceCliente service;

    @Autowired
    public ClienteController(ClienteRepository repository, ServiceCliente service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping
    public List<Cliente> buscaTodosClientes() {
      return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente save(@RequestBody @Valid ClienteDTO dto) {
        service.verificaSeExisteCpfEmail(dto, null);
        return repository.save(new Cliente(dto));
    }

    @GetMapping("{id}")
    public Cliente buscaPorId(@PathVariable Integer id) {

        return repository.findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {

        repository.findById(id)
                .map( cliente -> {
                    service.verificaPedidoVinculadoCliente(cliente);
                    repository.delete(cliente);
                    return Void.TYPE;
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(@PathVariable Integer id, @RequestBody @Valid ClienteDTO dto) {

        Cliente cliente = new Cliente(dto);

        service.verificaSeExisteCpfEmail(dto, id);
        repository.findById(id)
                .map( tempCliente -> {
                    cliente.setId(tempCliente.getId());
                    return repository.save(cliente);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }
}
