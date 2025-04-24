package io.github.henriquepavoni.postaRapidoApi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public record ClienteDTO(

        @NotEmpty(message = "{campo.nome.obrigatorio}")
        String nome,

        @Email(message = "{campo.email.invalido}")
        String email,

        String telefone,

        @CPF(message = "{campo.cpf.invalido}")
        @NotEmpty(message = "{campo.cpf.obrigatorio}")
        String cpf,

        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataNascimento,

        String endereco,

        String cidade,

        String estado,

        String cep,

        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataCadastro,

        boolean ativo ){

}
