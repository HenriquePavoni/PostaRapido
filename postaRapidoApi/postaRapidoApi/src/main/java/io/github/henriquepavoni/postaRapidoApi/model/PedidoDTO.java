package io.github.henriquepavoni.postaRapidoApi.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PedidoDTO(
  @NotEmpty(message = "{campo.data.pedido.obrigatorio}")
  String dataPedido,
  @NotEmpty(message = "{campo.status.obrigatorio}")
  String status,
  @NotEmpty(message = "{campo.detalhes.obrigatorio}")
  String detalhes,
  @NotNull(message = "{campo.status.valor}")
  BigDecimal valor,
  @NotNull(message = "{campo.cliente.obrigatorio}")
  Cliente cliente
) {
}
