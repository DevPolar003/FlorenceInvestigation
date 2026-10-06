package com.has.etec.projectShelock.dtos.tentativa;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TentativaRequest(
        @JsonProperty("pontuacaoFinal")
        int pontuacaoFinal,

        @JsonProperty("idUsuario")
        int idUsuario,

        @JsonProperty("idCaso")
        int idCaso,

        @JsonProperty("tempoSegundos")
        int tempoSegundos
) { }