package com.bwiv.expensify.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bwiv.expensify.models.Balance;

@Repository
public interface BalanceRepository extends CrudRepository<Balance, Long> {
    List<Balance> findAll();
}
