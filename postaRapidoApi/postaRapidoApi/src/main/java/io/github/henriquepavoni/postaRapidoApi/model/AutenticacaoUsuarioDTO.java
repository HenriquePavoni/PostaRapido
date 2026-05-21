package io.github.henriquepavoni.postaRapidoApi.model;

import jakarta.validation.constraints.NotEmpty;

public record AutenticacaoUsuarioDTO(

  @NotEmpty(message = "{campo.username.obrigatorio}")
  String username,

  @NotEmpty(message = "{campo.password.obrigatorio}")
  String password
) {
}
