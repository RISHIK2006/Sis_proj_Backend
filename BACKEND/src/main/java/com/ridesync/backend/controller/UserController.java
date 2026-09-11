package com.ridesync.backend.controller;

import com.ridesync.backend.model.User;
import org.springframework.web.bind.annotation.*;
import com.ridesync.backend.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService = new UserService();
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        return userService.register(user);

    }
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return userService.login(user);

    }
}