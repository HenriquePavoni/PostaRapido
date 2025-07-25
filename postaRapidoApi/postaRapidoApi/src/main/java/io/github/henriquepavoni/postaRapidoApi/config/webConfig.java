package io.github.henriquepavoni.postaRapidoApi.config;

import org.springframework.context.annotation.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class webConfig {

  @Bean
  public FilterRegistrationBean<CorsFilter> corsFilterFilterRegistrationBean() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();

    corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
    corsConfiguration.setAllowedMethods(Arrays.asList("*"));
    corsConfiguration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);

    CorsFilter corsFilter = new CorsFilter(source);

    FilterRegistrationBean<CorsFilter> filter = new FilterRegistrationBean<>(corsFilter);
    filter.setOrder(Ordered.HIGHEST_PRECEDENCE);

    return filter;
  }
}
