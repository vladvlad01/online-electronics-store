package com.appconfig.repository;



import com.appconfig.model.AccountAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountAddressRepository extends JpaRepository<AccountAddress,Integer> {


}