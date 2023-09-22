package com.bwiv.expensify.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bwiv.expensify.models.Event;
import com.bwiv.expensify.models.Expense;
@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    List<Event> findAll();

    @Query(value = "select expenses.* from events join expensify.expenses where events.id = expenses.event_id and events.id = :id;", nativeQuery = true)
    List<Expense> getExpensesByEventId(Long id);
}