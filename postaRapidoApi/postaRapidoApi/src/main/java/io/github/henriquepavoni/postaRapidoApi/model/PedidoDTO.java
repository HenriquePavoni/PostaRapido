package io.github.henriquepavoni.postaRapidoApi.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PedidoDTO(
  @NotBlank(message = "{campo.data.pedido.obrigatorio}")
  String dataPedido,
  @NotBlank(message = "{campo.status.obrigatorio}")
  String status,
  @NotBlank(message = "{campo.detalhes.obrigatorio}")
  String detalhes,
  @NotBlank(message = "{campo.status.valor}")
  String valor,
  @NotNull(message = "{campo.cliente.obrigatorio}")
  Cliente cliente
) {
}
