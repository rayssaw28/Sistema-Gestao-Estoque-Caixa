package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.service;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.UsuarioRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.UsuarioResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Usuario;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions.BusinessException;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions.ResourceNotFoundException;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper.UsuarioMapper;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmailIgnoreCase(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + username));
    }


    public List<UsuarioResponse> listar() {
        return repository.findAll()
                .stream()
                .map(UsuarioMapper::toResponse)
                .toList();
    }

    public UsuarioResponse buscarPorId(Long id) {
        var user = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return UsuarioMapper.toResponse(user);
    }

    @Transactional
    public UsuarioResponse cadastrar(UsuarioRequest req) {

        if (repository.existsByEmailIgnoreCase(req.email())) {
            throw new BusinessException("E-mail já cadastrado");
        }

        Usuario novo = UsuarioMapper.toEntity(req);
        Usuario salvo = repository.save(novo);

        return UsuarioMapper.toResponse(salvo);
    }

    @Transactional
    public UsuarioResponse atualizar(Long id, UsuarioRequest req) {
        var existente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));


        if (!existente.getEmail().equalsIgnoreCase(req.email()) &&
                repository.existsByEmailIgnoreCase(req.email())) {
            throw new BusinessException("E-mail informado já pertence a outro usuário");
        }

        UsuarioMapper.copyToEntity(req, existente);
        var salvo = repository.save(existente);

        return UsuarioMapper.toResponse(salvo);
    }

    @Transactional
    public UsuarioResponse alternarStatus(Long id) {
        var existente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        existente.setAtivo(!existente.getAtivo());
        var salvo = repository.save(existente);

        return UsuarioMapper.toResponse(salvo);
    }

    @Transactional
    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Usuário não encontrado");
        }
        repository.deleteById(id);
    }

}