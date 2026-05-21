package io.github.henriquepavoni.postaRapidoApi.control;

import io.github.henriquepavoni.postaRapidoApi.model.AutenticacaoUsuarioDTO;
import io.github.henriquepavoni.postaRapidoApi.model.LoginResponseDTO;
import io.github.henriquepavoni.postaRapidoApi.model.RegistroUsuarioDTO;
import io.github.henriquepavoni.postaRapidoApi.model.Usuario;
import io.github.henriquepavoni.postaRapidoApi.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

  @Autowired
  private UsuarioService usuarioService;

  @PostMapping("/login")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public LoginResponseDTO login(@RequestBody @Valid AutenticacaoUsuarioDTO data) {
      return usuarioService.login(data);
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.OK)
  public Usuario register(@RequestBody @Valid RegistroUsuarioDTO data) {
    return usuarioService.registrar(data);
  }
}
