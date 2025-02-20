package io.github.henriquepavoni.postaRapidoApi.model;

public record PedidoDTO(
  String dataPedido,
  String status,
  String detalhes,
  String valor,
  Integer idCliente
) {
}
