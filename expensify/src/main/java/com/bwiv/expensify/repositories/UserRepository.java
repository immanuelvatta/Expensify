package com.bwiv.expensify.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bwiv.expensify.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();

    @Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
    User findByEmail(@Param("email") String email);


    @Query(value = "SELECT * FROM users WHERE user_name = :userName", nativeQuery = true)
    User findByUsername(String userName);
}