package com.appconfig.service;


import com.appconfig.dto.CheckLoginModel;
import com.appconfig.model.*;
import com.appconfig.repository.AccountDetailsRepository;
import com.appconfig.repository.AccountRepository;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;


@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountDetailsRepository accountDetailsRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

	public String getUserStatusAndName() {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (!(authentication instanceof AnonymousAuthenticationToken) && (authentication.isAuthenticated())) {
                return new Gson().toJson(new CheckLoginModel(true, authentication.getName()));
            }
            return new Gson().toJson("NOT_LOGGED");
	}

    public String registerAccount(RegisterAccount registerAccount) {
            if(accountRepository.existsByUsername(registerAccount.getUsername()) || !registerAccount.getPassword().equals(registerAccount.getRepeatPassword())){
                return new Gson().toJson("ERROR");
            }

        Account account = new Account();
            account.setUsername(registerAccount.getUsername());
            account.setPassword(passwordEncoder.encode(registerAccount.getPassword()));
            Role role = new Role();
            role.setRole("USER");
            account.setRoles(Arrays.asList(role));

        AccountDetails accountDetails = new AccountDetails();
            accountDetails.setEmail(registerAccount.getEmail());
            accountDetails.setFullName(registerAccount.getFullName());
            accountDetails.setPhone(registerAccount.getPhonePrefix()+registerAccount.getPhoneSuffix());
            accountDetails.setSecurityQuestion(registerAccount.getSecurityQuestion());
            accountDetails.setSecurityAnswer(registerAccount.getSecurityAnswer());

            account.setAccountDetails(accountDetails);

            try{
                accountRepository.save(account);
                return new Gson().toJson("REGISTERED");
            }catch (Exception e){
                return new Gson().toJson("ERROR");
            }

    }

    public String checkIfUsernameExist(String username) {
	    if(accountRepository.existsByUsername(username)){
            return new Gson().toJson("ERROR");
        }
        return new Gson().toJson("PASS");
    }

    public String checkIfEmailExist(String email) {

        if(accountDetailsRepository.existsByEmail(email)){
            return new Gson().toJson("ERROR");
        }
        return new Gson().toJson("PASS");
    }

    public AccountAddress saveAddress(AccountAddress accountAddress){
	    String username = getCurrentUsername();
	    if(username == null)
	        return null;

	    Account account = accountRepository.findAccountByUsername(username);
	    account.setAccountAddress(accountAddress);
	    accountRepository.save(account);

	    return account.getAccountAddress();
    }

    public AccountAddress getAccountAddress(){
        String username = getCurrentUsername();
        if(username == null)
            return null;

        Account account = accountRepository.findAccountByUsername(username);

        return account.getAccountAddress();
    }


    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       String username = "";
        if (!(authentication instanceof AnonymousAuthenticationToken) && (authentication.isAuthenticated())) {
            username =  authentication.getName();
        }
        return username;
    }
}

