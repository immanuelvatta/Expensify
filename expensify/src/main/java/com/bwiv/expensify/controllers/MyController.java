package com.bwiv.expensify.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bwiv.expensify.models.Balance;
import com.bwiv.expensify.models.Event;
import com.bwiv.expensify.models.Expense;
import com.bwiv.expensify.models.User;
import com.bwiv.expensify.models.UserEvent;
import com.bwiv.expensify.services.BalanceService;
import com.bwiv.expensify.services.EventService;
import com.bwiv.expensify.services.ExpenseService;
import com.bwiv.expensify.services.UserEventService;
import com.bwiv.expensify.services.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MyController {

    @Autowired
    EventService eventService;

    @Autowired
    UserService userService;

    @Autowired
    UserEventService userEventService;

    @Autowired
    BalanceService balanceService;

    @Autowired
    ExpenseService expenseService;

    @GetMapping("/api/events")
    public List<Event> index() {
        return eventService.getEvents();
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userService.allUsers();
    }

    // @PostMapping("/api/events")
    // public Event create(
    // @RequestParam String eventName,
    // @RequestParam String description,
    // @RequestParam String eventDate,
    // @RequestParam Long userId) {
    // User user = userService.getUserById(userId);
    // Event event = new Event();
    // event.setEventName(eventName);
    // event.setDescription(description);
    // / Creates a local date obj
    // LocalDate localDate = LocalDate.parse(eventDate);
    // / getting timezone of the computer thats currently running
    // ZoneId defaultZoneId = ZoneId.systemDefault();
    // / make a date assuming the day started in this time zone
    // Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());
    // sets it to a date
    // event.setEventDate(date);
    // event.setUser(user);

    // return eventService.createEvent(event);
    // }

    @PostMapping("/api/events")
    public ResponseEntity<Object> create(@Valid @ModelAttribute("event") Event event, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(400).body(result.getAllErrors());
        }
        Event newEvent = eventService.createEvent(event);
        return ResponseEntity.ok().body(newEvent);
    }

    @PostMapping("/api/userEvents")
    public ResponseEntity<Object> createUserEvents(@Valid @ModelAttribute("userEvent") UserEvent userEvent,
            BindingResult result) {
        // System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        // System.out.println(userEvent);
        // System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        if (result.hasErrors()) {
            return ResponseEntity.status(400).body(result.getAllErrors());
        }
        UserEvent newUserEvent = userEventService.createUserEvent(userEvent);
        return ResponseEntity.ok().body(newUserEvent);
    }

    @PostMapping("/api/users")
    public User createUser(@ModelAttribute("newUser") User newUser) {
        return userService.createUser(newUser);
    }

    @PostMapping("/api/expenses")
    public ResponseEntity<Object> createExpense(@Valid @ModelAttribute("expense") Expense expense, BindingResult result){
        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        System.out.println(expense);
        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        if(result.hasErrors()){
            return ResponseEntity.status(400).body(result.getAllErrors());
        }
        Expense newExpense = expenseService.createExpense(expense);
        return ResponseEntity.ok().body(newExpense);
    }
    
    @PostMapping("/api/balance")
    public ResponseEntity<Object> createBalance(@Valid @ModelAttribute("balance") Balance balance, BindingResult result){
        if(result.hasErrors()){
            return ResponseEntity.status(400).body(result.getAllErrors());
        }
        Balance newBalance = balanceService.createBalance(balance);
        return ResponseEntity.ok().body(newBalance);
    }



    // @PostMapping("/api/users")
    // public User createUser(
    // @RequestParam String uid,
    // @RequestParam String userName,
    // @RequestParam String email) {
    // User user = new User();
    // user.setUid(uid);
    // user.setUserName(userName);
    // user.setEmail(email);
    // return userService.createUser(user);
    // }

    @GetMapping("/api/users/email")
    public User getByEmail(@RequestParam(value = "email") String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/api/users/userName")
    public User getByUserName(@RequestParam(value = "userName") String userName) {
        return userService.getUserByUsername(userName);
    }

    @GetMapping("/api/users/id/{id}")
    public User getByUserId(@RequestParam Long id) {
        return userService.getUserById(id);
    }

    // @PostMapping("/api/userEvents")
    // public ResponseEntity<Object> createUserEvents(@RequestBody UserEvent
    // newUserEvent) {
    // System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    // System.out.println(newUserEvent);
    // System.out.println(newUserEvent.getUserId());
    // System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    // userEventService.createUserEvent(newUserEvent);
    // return ResponseEntity.ok().body(newUserEvent);
    // }

    @GetMapping("/api/events/tripBuddies")
    public List<User> getAllTripBuddies(@RequestParam(value = "id") Long id) {
        return userService.getUsersByEventId(id);
    }
    
    @GetMapping("api/trip/expenses")
    public List<Expense> getAllExpensesForTrip(@RequestParam(value = "id") Long id){
        return eventService.getExpensesByEventId(id);
    }
}