package io.github.henriquepavoni.postaRapidoApi.model;

import io.github.henriquepavoni.postaRapidoApi.enums.UserRole;

public record RegistroUsuarioDTO(
  String username,
  String password,
  UserRole role
) {
}
