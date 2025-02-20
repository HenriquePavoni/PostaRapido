package io.github.henriquepavoni.postaRapidoApi.repository;

import io.github.henriquepavoni.postaRapidoApi.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
}
