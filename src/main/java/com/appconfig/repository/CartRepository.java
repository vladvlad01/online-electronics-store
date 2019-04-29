package com.appconfig.repository;

import com.appconfig.model.Cart;
import com.appconfig.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    boolean existsById(Integer groupId);
    Cart findByUsername(String username);
    boolean existsByUsername(String username);
}