package com.has.etec.projectShelock.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tentativa")
public class Tentativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tentativa")
    private Long id;

    @Column(name = "id_usuario")
    private int idUsuario;

    @Column(name = "id_caso")
    private int idCaso;

    @Column(name = "pontuacao_final")
    private int pontuacaoFinal;

    @Column(name = "tempo_segundos")
    private Integer tempoSegundos;
}