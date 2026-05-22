package io.github.henriquepavoni.postaRapidoApi.repository;

import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    @Query("select c from cliente c where " +
        "upper(c.nome) like upper(:nome) " +
        "and (:status = '' or upper(case when c.ativo = true then 'Ativo' else 'Desativado' end) = upper(:status)) ")
    List<Cliente> findByNomeClienteOrStatus(@Param("nome") String nome, @Param("status") String status);

    long countByCpf(String cpf);

    @Query("SELECT COUNT(c) FROM cliente c WHERE c.cpf = :cpf AND c.id != :clienteId")
    long countByCpfAndNotId(String cpf, Integer clienteId);

    long countByEmail(String email);

    @Query("SELECT COUNT(c) FROM cliente c WHERE c.email = :email AND c.id != :clienteId")
    long countByEmailAndNotId(String email, Integer clienteId);

}
