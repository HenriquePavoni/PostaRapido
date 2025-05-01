package io.github.henriquepavoni.postaRapidoApi.model;

import jakarta.validation.constraints.NotNull;

public record PedidoDTO(
  String dataPedido,
  String status,
  String detalhes,
  String valor,
  @NotNull(message = "{campo.cliente.obrigatorio}")
  Cliente cliente
) {
}
