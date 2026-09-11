package com.ridesync.backend.service;

import com.ridesync.backend.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public String register(User user) {

        return "Welcome " + user.getName();

    }
    public String login(User user) {

        return "Login Successful. Welcome back " + user.getName();

    }

}