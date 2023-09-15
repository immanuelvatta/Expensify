package com.bwiv.expensify.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bwiv.expensify.models.Event;

// ...
@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    // this method retrieves all the books from the database
    List<Event> findAll();
    // this method finds books with descriptions containing the search string

    // this method counts how many titles contain a certain string
}