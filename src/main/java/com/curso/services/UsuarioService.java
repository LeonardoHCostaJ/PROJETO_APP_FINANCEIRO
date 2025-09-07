package com.curso.services;

import com.curso.domains.Usuario;
import com.curso.domains.dtos.UsuarioDTO;
import com.curso.domains.enums.PersonType;
import com.curso.repositories.UsuarioRepository;
import com.curso.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private PasswordEncoder encoder;

    public UsuarioService(UsuarioRepository repo, PasswordEncoder encoder) {
        this.usuarioRepo = repo; this.encoder = encoder;
    }

    public List<UsuarioDTO> findAll(){
        return usuarioRepo.findAll().stream()
                .map(obj -> new UsuarioDTO(obj))
                .collect(Collectors.toList());
    }

    public Usuario findbyId(Long id){
        Optional<Usuario> obj = usuarioRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Usuario não encontrado! ID: "+ id));
    }

    public Usuario create(UsuarioDTO dto){
        dto.setId(null);
        Usuario obj = new Usuario(dto);
        obj.setSenha(encoder.encode(obj.getSenha()));
        return usuarioRepo.save(obj);
    }

    public Usuario update(Long id, UsuarioDTO objDto){
        objDto.setId(id);
        Usuario oldObj = findbyId(id);
        oldObj = new Usuario(objDto);
        oldObj.setSenha(encoder.encode(oldObj.getSenha()));
        return usuarioRepo.save(oldObj);
    }

    public void delete (Long id){
        Usuario obj = findbyId(id);
        usuarioRepo.deleteById(id);
    }

}
