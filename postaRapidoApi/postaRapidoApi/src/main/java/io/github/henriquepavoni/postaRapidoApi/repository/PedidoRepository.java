package io.github.henriquepavoni.postaRapidoApi.repository;

import io.github.henriquepavoni.postaRapidoApi.model.Cliente;
import io.github.henriquepavoni.postaRapidoApi.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

  @Query("select p from pedido p join p.cliente c where " +
    "upper(c.nome) like upper(:nome) " +
    "and (:status = '' or upper(p.status) = upper(:status)) ")
  List<Pedido> findByNomeClienteOrStatus(@Param("nome") String nome, @Param("status") String status);

  long countByCliente(@Param("cliente") Cliente cliente);
}
