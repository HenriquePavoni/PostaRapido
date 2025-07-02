package io.github.henriquepavoni.postaRapidoApi.service;

import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import io.github.henriquepavoni.postaRapidoApi.model.ClienteDTO;
import io.github.henriquepavoni.postaRapidoApi.repository.ClienteRepository;
import io.github.henriquepavoni.postaRapidoApi.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@org.springframework.stereotype.Service
public class ServiceCliente {

    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;

    @Autowired
    public ServiceCliente(ClienteRepository clienteRepository, PedidoRepository pedidoRepository) {
        this.clienteRepository = clienteRepository;
        this.pedidoRepository = pedidoRepository;
    }

    public void verificaSeExisteCpfEmail(ClienteDTO dto, Integer id) {
        Cliente cliente = new Cliente(dto);

        if(id == null) {
            if((clienteRepository.countByCpf(cliente.getCpf()) > 0)
                    && (clienteRepository.countByEmail(cliente.getEmail()) > 0)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF e Email já cadastrado.");
            }

            if(clienteRepository.countByCpf(cliente.getCpf()) > 0) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado.");
            }

            if(clienteRepository.countByEmail(cliente.getEmail()) > 0) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado.");
            }
        }

        if((clienteRepository.countByCpfAndNotId(cliente.getCpf(), id) > 0)
                && (clienteRepository.countByEmailAndNotId(cliente.getEmail(), id) > 0))
        {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF e Email já cadastrado.");
        }

        if(clienteRepository.countByCpfAndNotId(cliente.getCpf(), id) > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado.");
        }

        if(clienteRepository.countByEmailAndNotId(cliente.getEmail(), id) > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado.");
        }

    }

    public void verificaPedidoVinculadoCliente(Cliente cliente) {
        if(pedidoRepository.countByCliente(cliente) >= 1) {
          throw new ResponseStatusException(HttpStatus.CONFLICT, "Existe um pedido vinculado a esse cliente.");
        }
    }

}
