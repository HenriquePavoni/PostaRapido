package io.github.henriquepavoni.postaRapidoApi.service;

import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import io.github.henriquepavoni.postaRapidoApi.model.ClienteDTO;
import io.github.henriquepavoni.postaRapidoApi.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@org.springframework.stereotype.Service
public class ServiceCliente {

    private final ClienteRepository repository;

    @Autowired
    public ServiceCliente(ClienteRepository repository) {
        this.repository = repository;
    }

    public void verificaSeExisteCpfEmail(ClienteDTO dto, Integer id) {
        Cliente cliente = new Cliente(dto);

        if(id == null) {
            if((repository.countByCpf(cliente.getCpf()) > 0)
                    && (repository.countByEmail(cliente.getEmail()) > 0)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF e Email já cadastrado.");
            }

            if(repository.countByCpf(cliente.getCpf()) > 0) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado.");
            }

            if(repository.countByEmail(cliente.getEmail()) > 0) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado.");
            }
        }

        if((repository.countByCpfAndNotId(cliente.getCpf(), id) > 0)
                && (repository.countByEmailAndNotId(cliente.getEmail(), id) > 0))
        {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF e Email já cadastrado.");
        }

        if(repository.countByCpfAndNotId(cliente.getCpf(), id) > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado.");
        }

        if(repository.countByEmailAndNotId(cliente.getEmail(), id) > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado.");
        }

    }

}
