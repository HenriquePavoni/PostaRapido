package io.github.henriquepavoni.postaRapidoApi.util;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class ConverterStringToBigDecimal {
  public BigDecimal converter(String value) {

    if(value == null) {
      return null;
    }

    value = value.replace(".", "")
      .replace(",", ".");

    return new BigDecimal(value);
  }
}
