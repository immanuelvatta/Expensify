package com.bwiv.expensify.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bwiv.expensify.models.Expense;

@Repository
public interface ExpenseRepository extends CrudRepository<Expense, Long> {
    List<Expense> findAll();

    @Query(value = "SELECT expenses.* FROM events JOIN expensify.expenses WHERE events.id = expenses.event_id AND events.id = :id", nativeQuery = true)
    List<Expense> getExpensesByEventId(Long id);
}