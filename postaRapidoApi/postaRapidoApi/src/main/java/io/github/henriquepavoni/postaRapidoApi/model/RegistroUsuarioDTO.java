package io.github.henriquepavoni.postaRapidoApi.model;

import io.github.henriquepavoni.postaRapidoApi.enums.UserRole;
import jakarta.validation.constraints.NotEmpty;

public record RegistroUsuarioDTO(

  @NotEmpty(message = "{campo.username.obrigatorio}")
  String username,

  @NotEmpty(message = "{campo.password.obrigatorio}")
  String password,

  UserRole role
) {
}
