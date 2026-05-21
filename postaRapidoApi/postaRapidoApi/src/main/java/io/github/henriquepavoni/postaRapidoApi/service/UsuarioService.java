package io.github.henriquepavoni.postaRapidoApi.service;

import io.github.henriquepavoni.postaRapidoApi.config.TokenService;
import io.github.henriquepavoni.postaRapidoApi.enums.UserRole;
import io.github.henriquepavoni.postaRapidoApi.model.AutenticacaoUsuarioDTO;
import io.github.henriquepavoni.postaRapidoApi.model.LoginResponseDTO;
import io.github.henriquepavoni.postaRapidoApi.model.RegistroUsuarioDTO;
import io.github.henriquepavoni.postaRapidoApi.model.Usuario;
import io.github.henriquepavoni.postaRapidoApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private TokenService tokenService;

  public LoginResponseDTO login(AutenticacaoUsuarioDTO data) {
      var usuarioSenha = new UsernamePasswordAuthenticationToken(data.username(), data.password());
      var auth = this.authenticationManager.authenticate(usuarioSenha);
      var token = tokenService.gerarToken((Usuario) auth.getPrincipal());

      return new LoginResponseDTO(token);
  }

  public Usuario registrar(RegistroUsuarioDTO data) {

    if(this.usuarioRepository.findByUsername(data.username()) != null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuario já existe.");
    }

    String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

    new Usuario();
    Usuario novoUsuario = Usuario.builder().
      username(data.username())
      .password(encryptedPassword)
      .role(UserRole.USER)
      .build();

    return usuarioRepository.save(novoUsuario);
  }
}
