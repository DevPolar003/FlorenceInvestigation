package com.has.etec.projectShelock.services;

import com.has.etec.projectShelock.dtos.tentativa.TentativaRequest;
import com.has.etec.projectShelock.dtos.usuario.UsuarioRequest;
import com.has.etec.projectShelock.entities.Tentativa;
import com.has.etec.projectShelock.entities.Usuario;
import com.has.etec.projectShelock.repositories.TentativaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TentativaService {

    public TentativaRepository tentativaRepository;

    public TentativaService(TentativaRepository tentativaRepository) {
        this.tentativaRepository = tentativaRepository;
    }

    public Tentativa salvarTentativa(TentativaRequest request) {

        Tentativa tentativa = new Tentativa();

        tentativa.setPontuacaoFinal(request.pontuacaoFinal());
        tentativa.setIdUsuario(request.idUsuario());
        tentativa.setIdCaso(request.idCaso());
        tentativa.setTempoSegundos(request.tempoSegundos());

        return tentativaRepository.save(tentativa);
    }
    public List<Tentativa> buscarTentativa() {
        return tentativaRepository.findAll();
    }
}
