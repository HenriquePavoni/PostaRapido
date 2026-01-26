package io.github.henriquepavoni.postaRapidoApi.repository;

import io.github.henriquepavoni.postaRapidoApi.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

  UserDetails findByUsername(String usuario);
}
