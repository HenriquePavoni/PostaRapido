package io.github.henriquepavoni.postaRapidoApi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Table(name = "pedido")
@Entity(name = "pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pedido {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "id_cliente")
  private Cliente cliente;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @Column(name = "data_pedido", updatable = false)
  private LocalDate dataPedido;

  @Column
  private String status;

  @Column
  private String detalhes;

  @Column
  private BigDecimal valor;

  public Pedido(PedidoDTO dto) {
    this.dataPedido = LocalDate.
      parse(dto.dataPedido(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    this.status = dto.status();
    this.detalhes = dto.detalhes();
    this.cliente = dto.cliente();
  }

}
