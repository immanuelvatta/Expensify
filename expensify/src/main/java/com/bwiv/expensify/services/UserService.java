package com.bwiv.expensify.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwiv.expensify.models.User;
import com.bwiv.expensify.repositories.EventRepository;
import com.bwiv.expensify.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    // returns all the events
    public List<User> allUsers() {
        return userRepository.findAll();
    }
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }


}
