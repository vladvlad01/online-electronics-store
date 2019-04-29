package com.appconfig.controllers;

import com.appconfig.model.AccountAddress;
import com.appconfig.model.RegisterAccount;
import com.appconfig.service.AccountService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {


    @Autowired
    private AccountService accountService;


    @GetMapping("/user")
    @ResponseBody
    public Principal user(Principal user, HttpServletRequest request, HttpServletResponse response) throws Exception {
          return user;
    }


    @RequestMapping(value="/logout", method = RequestMethod.POST)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        try{
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null){
                new SecurityContextLogoutHandler().logout(request, response, auth);
            }
            return new Gson().toJson("SUCCESS");
        }catch(Exception e){
            return new Gson().toJson("FAIL");
        }

    }

    @RequestMapping(value="/checkLogIn", method = RequestMethod.POST)
    @ResponseBody
    public String checkLogIn () {
        try{
            return accountService.getUserStatusAndName();

        }catch(Exception e){
            return new Gson().toJson("FAIL");
        }

    }


    @ResponseBody
    @PostMapping(value = "/register",consumes = "application/json", produces = "application/json")
    public String registerAccount(@Valid @RequestBody RegisterAccount registerAccount, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new Gson().toJson("ERROR");
        }
        return accountService.registerAccount(registerAccount);
    }


    @ResponseBody
    @GetMapping("/checkIfUsernameExist")
    public String checkIfUsernameExist(@RequestParam String username){
        if(username == null){
            return new Gson().toJson("ERROR");
        }
        return accountService.checkIfUsernameExist(username);
    }


    @ResponseBody
    @GetMapping(value = "/checkIfEmailExist", produces = "application/json")
    public String checkIfEmailExist(@RequestParam String email){
        if(email == null){
            return new Gson().toJson("ERROR");
        }
        return accountService.checkIfEmailExist(email);
    }

    @ResponseBody
    @GetMapping(value = "/getAccountAddress", produces = "application/json")
    public AccountAddress getAccountAddress() {
        return accountService.getAccountAddress();
    }

    @ResponseBody
    @PostMapping(value = "/saveAccountAddress",consumes = "application/json", produces = "application/json")
    public AccountAddress saveAccountAddress(@RequestBody AccountAddress accountAddress) {
        return accountService.saveAddress(accountAddress);
    }


}
