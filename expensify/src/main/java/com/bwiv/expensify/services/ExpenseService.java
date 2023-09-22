package com.bwiv.expensify.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwiv.expensify.models.Expense;
import com.bwiv.expensify.repositories.ExpenseRepository;

import jakarta.validation.Valid;

@Service
public class ExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;

    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getExpensesByEventId(Long id) {
        return expenseRepository.getExpensesByEventId(id);
    }
}