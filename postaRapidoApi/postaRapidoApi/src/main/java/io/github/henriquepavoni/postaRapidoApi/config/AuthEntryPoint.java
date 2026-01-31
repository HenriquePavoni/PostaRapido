package io.github.henriquepavoni.postaRapidoApi.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.henriquepavoni.postaRapidoApi.exception.ApiErrors;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {
  @Override
  public void commence(HttpServletRequest request,
                       HttpServletResponse response,
                       AuthenticationException authException) throws IOException {

    ApiErrors apiErrors = new ApiErrors("Usuário ou senha incorreto(s)");

    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.setContentType("application/json");
    response.getWriter().write(new ObjectMapper().writeValueAsString(apiErrors));
  }
}
