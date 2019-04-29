package com.appconfig.dto;

public class CheckLoginModel {

    private boolean authenticated;
    private String user;

    public CheckLoginModel(boolean authenticated, String user) {
        this.authenticated = authenticated;
        this.user = user;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
