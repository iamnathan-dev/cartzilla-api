package com.source.cartzilla.controller;

import com.source.cartzilla.model.Users;
import com.source.cartzilla.service.UsersService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UsersController {
    private final UsersService service;

    public UsersController(UsersService service) {
        this.service = service;
    }

    @GetMapping
    public List<Users> getAllUsers() {
        return service.getAllUsers();
    }
}
