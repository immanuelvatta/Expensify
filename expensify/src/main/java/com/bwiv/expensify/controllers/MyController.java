package com.bwiv.expensify.controllers;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/api/events")
    public List<Event> index() {
        return eventService.getEvents();
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userService.allUsers();
    }
    
    @PostMapping("/api/events")
    public Event create(
        @RequestParam String eventName, 
        @RequestParam String description, 
        @RequestParam  String eventDate, 
        @RequestParam Long userId) {
        User user = userService.getUserById(userId);
        Event event = new Event();
        event.setEventName(eventName);
        event.setDescription(description);
        // Creates a local date obj 
        LocalDate localDate = LocalDate.parse(eventDate);
        //getting timezone of the computer thats currently running
        ZoneId defaultZoneId = ZoneId.systemDefault();
        //make a date assuming the day started in this time zone
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());
        //sets it to a date
        event.setEventDate(date);
        event.setUser(user);
        
        return eventService.createEvent(event);
    }

    @PostMapping("/api/users")
    public User createUser(
        @RequestParam String uid, 
        @RequestParam String userName, 
        @RequestParam  String email) {
        User user = new User();
        user.setUid(uid);
        user.setUserName(userName);
        user.setEmail(email);
        return userService.createUser(user);
    }

    @GetMapping("/api/users/{email}")
    public User getByEmail(@RequestParam String email) {
        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        System.out.println(email);
        return userService.getUserByEmail(email);
    }
}