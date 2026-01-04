package com.source.cartzilla.service;

import com.source.cartzilla.model.Users;
import com.source.cartzilla.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    private final UsersRepository repository;

    private UsersService(UsersRepository repository) {
        this.repository = repository;
    }

    public List<Users> getAllUsers() {
        return repository.findAll();
    }
}
