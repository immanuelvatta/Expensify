package com.bwiv.expensify.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwiv.expensify.models.Event;
import com.bwiv.expensify.models.Expense;
import com.bwiv.expensify.repositories.EventRepository;
@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;
    // returns all the events

    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    
}
