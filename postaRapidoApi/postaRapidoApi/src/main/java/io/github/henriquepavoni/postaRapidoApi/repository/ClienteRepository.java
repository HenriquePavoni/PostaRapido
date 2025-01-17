package io.github.henriquepavoni.postaRapidoApi.repository;

import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    long countByCpf(String cpf);

    @Query("SELECT COUNT(c) FROM cliente c WHERE c.cpf = :cpf AND c.id != :clienteId")
    long countByCpfAndNotId(String cpf, Integer clienteId);

    long countByEmail(String email);

    @Query("SELECT COUNT(c) FROM cliente c WHERE c.email = :email AND c.id != :clienteId")
    long countByEmailAndNotId(String email, Integer clienteId);
}
