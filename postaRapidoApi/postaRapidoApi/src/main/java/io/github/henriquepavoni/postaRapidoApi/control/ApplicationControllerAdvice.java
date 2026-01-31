package io.github.henriquepavoni.postaRapidoApi.control;

import io.github.henriquepavoni.postaRapidoApi.exception.ApiErrors;
import org.apache.coyote.BadRequestException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ApplicationControllerAdvice {

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ApiErrors handleValidationErrors(MethodArgumentNotValidException ex) {
    BindingResult bindingResult = ex.getBindingResult();
    List<String> messages = bindingResult.getAllErrors()
      .stream()
      .map(DefaultMessageSourceResolvable::getDefaultMessage)
      .collect(Collectors.toList());
    return new ApiErrors(messages);
  }

  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<?> handleResponseStatusException(ResponseStatusException ex) {
    ApiErrors apiErrors = new ApiErrors(ex.getReason());
    return new ResponseEntity<>(apiErrors, ex.getStatusCode());
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ApiErrors> handleBadCredentialsException(BadCredentialsException ex) {
    ApiErrors apiErrors = new ApiErrors("Usuário ou senha incorreto(s)");
    return new ResponseEntity<>(apiErrors, HttpStatus.UNAUTHORIZED);
  }

}

