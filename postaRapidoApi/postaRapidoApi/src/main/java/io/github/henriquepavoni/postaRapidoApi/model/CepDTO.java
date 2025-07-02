package io.github.henriquepavoni.postaRapidoApi.model;

public record CepDTO(
  String cep,
  String logradouro,
  String localidade,
  String uf
) {

}
