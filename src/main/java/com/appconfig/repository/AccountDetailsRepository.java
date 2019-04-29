package com.appconfig.repository;


import com.appconfig.model.AccountDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountDetailsRepository extends JpaRepository<AccountDetails,Integer> {
        boolean existsByEmail(String email);
}