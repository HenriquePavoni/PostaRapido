package io.github.henriquepavoni.postaRapidoApi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ClienteDTO(
        @NotEmpty
        String nome,

        @Email
        String email,

        String telefone,

        @CPF
        String cpf,

        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataNascimento,

        String endereco,

        String cidade,

        String estado,

        String cep,

        LocalDateTime dataCadastro,

        boolean ativo ){

}
