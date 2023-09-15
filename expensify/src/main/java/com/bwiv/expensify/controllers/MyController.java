package com.bwiv.expensify.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bwiv.expensify.models.Event;
import com.bwiv.expensify.models.User;
import com.bwiv.expensify.services.EventService;
import com.bwiv.expensify.services.UserService;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MyController {
    // @Autowired
    // private JdbcTemplate jdbcTemplate;

    @Autowired
    EventService eventService;

    @Autowired
    UserService userService;

    // @GetMapping("/test")
    // public String testDatabaseConnection() {
    //     try {
    //         // Execute a simple query to test the connection
    //         jdbcTemplate.queryForObject("SELECT 1", Integer.class);
    //         return "Database connection successful!";
    //     } catch (Exception e) {
    //         return "Database connection failed: " + e.getMessage();
    //     }
    // }

    @GetMapping(value="/api/events")
    public List<Event> index() {
        return eventService.getEvents();
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userService.allUsers();
    }
}