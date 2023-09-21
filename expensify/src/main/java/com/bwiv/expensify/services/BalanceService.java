package com.bwiv.expensify.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwiv.expensify.models.Balance;
import com.bwiv.expensify.repositories.BalanceRepository;

import jakarta.validation.Valid;

@Service
public class BalanceService {
    @Autowired
    BalanceRepository balanceRepository;

    public List<Balance> allBalance() {
        return balanceRepository.findAll();
    }

	public Balance createBalance(@Valid Balance balance) {
		return balanceRepository.save(balance);
	}
}
