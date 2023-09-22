package com.bwiv.expensify.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.bwiv.expensify.models.Expense;
import com.bwiv.expensify.models.User;
import com.bwiv.expensify.models.UserEvent;
import com.bwiv.expensify.repositories.EventRepository;
import com.bwiv.expensify.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    
    public List<User> allUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByUsername(String userName) {
        return userRepository.findByUsername(userName);
    }

    public List<User> getUsersByEventId(Long id) {
        return userRepository.getAllUsersByEventId(id);
    }
}
