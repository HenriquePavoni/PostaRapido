package io.github.henriquepavoni.postaRapidoApi.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import io.github.henriquepavoni.postaRapidoApi.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

  @Value("${api.security.token.secret}")
  private String secret;

  public String gerarToken(Usuario usuario) {
    try {
      Algorithm algoritmo = Algorithm.HMAC256(secret);
      return JWT.create()
        .withIssuer("api")
        .withSubject(usuario.getUsername())
        .withExpiresAt(genExpirationDate())
        .sign(algoritmo);
    } catch (JWTCreationException exception) {
      throw new RuntimeException("Erro ao gerar token jwt", exception);
    }
  }

  public String validarToken(String token) {
    try {
      Algorithm algoritmo = Algorithm.HMAC256(secret);
      return JWT.require(algoritmo)
        .withIssuer("api")
        .build()
        .verify(token)
        .getSubject();
    } catch (JWTVerificationException exception) {
      return "";
    }
  }

  private Instant genExpirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  }
}
