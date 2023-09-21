package com.bwiv.expensify.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bwiv.expensify.models.UserEvent;

@Repository
public interface UserEventRepository extends CrudRepository<UserEvent, Long> {
    List<UserEvent> findAll();
}