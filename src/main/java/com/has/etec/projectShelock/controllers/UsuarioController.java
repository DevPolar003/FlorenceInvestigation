package com.has.etec.projectShelock.controllers;

import com.has.etec.projectShelock.dtos.usuario.UsuarioRequest;
import com.has.etec.projectShelock.entities.Usuario;
import com.has.etec.projectShelock.services.UsuarioService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public Usuario cadastrar(@RequestBody UsuarioRequest request) {

        return usuarioService.cadastrarNovoUsuario(request);
    }

    @GetMapping("/{username}")
    public Usuario buscarPorUsername(@PathVariable String username) {
        return usuarioService.buscarPorUsername(username);
    }


    @GetMapping("/id/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {

        return usuarioService.buscarPorId(id);
    }
}