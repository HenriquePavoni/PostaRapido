package io.github.henriquepavoni.postaRapidoApi.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;


@Table(name = "cliente", uniqueConstraints = @UniqueConstraint(name = "unique_cpf_email", columnNames = {"cpf", "email"}))
@Entity(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(length = 15)
    private String telefone;

    @Column(unique = true, nullable = false, length = 11)
    private String cpf;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "data_nascimento", nullable = true)
    private Date dataNascimento;

    @Column(length = 255)
    private String endereco;

    @Column(length = 100)
    private String cidade;

    @Column(length = 2)
    private String estado;

    @Column(length = 8)
    private String cep;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "data_cadastro", updatable = false)
    private LocalDate dataCadastro;

    @Column(length = 2)
    private boolean ativo;

    public Cliente(ClienteDTO dto) {
        this.nome = dto.nome();
        this.email = dto.email();
        this.telefone = dto.telefone();
        this.cpf = dto.cpf();
        this.dataNascimento = dto.dataNascimento();
        this.endereco = dto.endereco();
        this.cidade = dto.cidade();
        this.estado = dto.estado();
        this.cep = dto.cep();
        this.ativo = dto.ativo();
    }

    @PrePersist
    public void preset() {
      setDataCadastro(LocalDate.now());
    }
}
