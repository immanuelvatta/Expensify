package com.bwiv.expensify.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bwiv.expensify.models.UserEvent;
import com.bwiv.expensify.repositories.UserEventRepository;


@Service
public class UserEventService {
    
    @Autowired
    UserEventRepository userEventRepository;

	public UserEvent createUserEvent( UserEvent userEvent) {
		return userEventRepository.save(userEvent);
	}
}
