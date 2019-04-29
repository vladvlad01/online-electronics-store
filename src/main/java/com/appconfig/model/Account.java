package com.appconfig.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ACCOUNTS")
public class Account {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(unique=true, nullable=false)
	private String username;
	@JsonIgnore
	@Column(nullable=false)
	private String password;

	@OneToMany(fetch=FetchType.EAGER,cascade = {CascadeType.ALL})
	@JoinColumn(name="account_id")
	private List<Role> roles;

	@OneToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name="id")
	private AccountDetails accountDetails;

	@OneToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name="id")
	private AccountAddress accountAddress;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public AccountDetails getAccountDetails() {
		return accountDetails;
	}

	public void setAccountDetails(AccountDetails accountDetails) {
		this.accountDetails = accountDetails;
	}

	public AccountAddress getAccountAddress() {
		return accountAddress;
	}

	public void setAccountAddress(AccountAddress accountAddress) {
		this.accountAddress = accountAddress;
	}

	@JsonIgnore
	public String[] getAuthorities() {
		String[] authorities = new String[this.roles.size()];
		for (int i = 0; i < this.roles.size(); i++) {
			authorities[i] = "ROLE_" + this.roles.get(i).getRole();
		}
		return authorities;
	}


}