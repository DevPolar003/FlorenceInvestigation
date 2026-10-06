package com.has.etec.projectShelock.services;

import com.has.etec.projectShelock.dtos.usuario.UsuarioRequest;
import com.has.etec.projectShelock.entities.Usuario;
import com.has.etec.projectShelock.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    public  UsuarioRepository usuarioRepository;

    public Usuario cadastrarNovoUsuario(UsuarioRequest request) {

        if (request.nome() == null ||
                request.nome().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O nome do usuário deve estar preenchido!"
            );
        }

        Optional<Usuario> usuarioExistente = usuarioRepository.findByNome(request.nome());

        if (usuarioExistente.isPresent()) {
            throw new RuntimeException(
                    "Já existe um usuário cadastrado com este nome!"
            );
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.nome());

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorUsername(String username) {
        return usuarioRepository.findByNome(username)
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado")
                );
    }

    public Usuario buscarPorId(Long id) {

        return usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado")
                );
    }
}