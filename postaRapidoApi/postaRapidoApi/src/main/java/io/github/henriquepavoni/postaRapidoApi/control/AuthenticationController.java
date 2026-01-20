package io.github.henriquepavoni.postaRapidoApi.control;

import io.github.henriquepavoni.postaRapidoApi.config.TokenService;
import io.github.henriquepavoni.postaRapidoApi.model.AutenticacaoUsuarioDTO;
import io.github.henriquepavoni.postaRapidoApi.model.LoginResponseDTO;
import io.github.henriquepavoni.postaRapidoApi.model.RegistroUsuarioDTO;
import io.github.henriquepavoni.postaRapidoApi.model.Usuario;
import io.github.henriquepavoni.postaRapidoApi.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private UsuarioRepository usuarioRepository;
  @Autowired
  private TokenService tokenService;

  @PostMapping("/login")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public LoginResponseDTO login(@RequestBody @Valid AutenticacaoUsuarioDTO data) {
    var usuarioSenha = new UsernamePasswordAuthenticationToken(data.username(), data.password());
    var auth = this.authenticationManager.authenticate(usuarioSenha);
    var token = tokenService.gerarToken((Usuario) auth.getPrincipal());

    return new LoginResponseDTO(token);
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public Usuario register(@RequestBody @Valid RegistroUsuarioDTO data) {
    if(this.usuarioRepository.findByUsername(data.username()) != null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuario já existe.");
    }

    String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

    new Usuario();
    Usuario novoUsuario = Usuario.builder().
      username(data.username())
      .password(encryptedPassword)
      .role(data.role())
      .build();

    return usuarioRepository.save(novoUsuario);
  }
}
