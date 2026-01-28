package io.github.henriquepavoni.postaRapidoApi.control;

import io.github.henriquepavoni.postaRapidoApi.model.CepDTO;
import io.github.henriquepavoni.postaRapidoApi.service.CepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cep")
public class CepController {

  private final CepService service;

  @Autowired
  public CepController(CepService service) {
    this.service = service;
  }

  @GetMapping("{cep}")
  public CepDTO buscaPorId(@PathVariable String cep) {
    return service.buscaCep(cep);
  }
}
