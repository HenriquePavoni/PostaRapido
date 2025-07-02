package io.github.henriquepavoni.postaRapidoApi.service;

import io.github.henriquepavoni.postaRapidoApi.model.CepDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ServiceCep {

  public CepDTO buscaCep(String cep) {

    if (cep.isEmpty()) {
      return null;
    }

    String url = "https://viacep.com.br/ws/" + cep + "/json";
    RestTemplate restTemplate = new RestTemplate();
    try {
      return restTemplate.getForObject(url, CepDTO.class);
    } catch (HttpClientErrorException.NotFound e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum CEP encontrado.");
    } catch (HttpClientErrorException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CEP inválido.");
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Exceção: " + e.getMessage());
    }

  }
}
