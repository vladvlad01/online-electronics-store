package com.appconfig.security;


//import com.appconfig.utils.MyBasicAuthenticationEntryPoint;

import com.appconfig.utils.MyBasicAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.BASIC_AUTH_ORDER)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private MyBasicAuthenticationEntryPoint authenticationEntryPoint;


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.httpBasic()
				.authenticationEntryPoint(authenticationEntryPoint)
				.and()
				.authorizeRequests()
				.antMatchers("/index.html","/assets/**","/api/register","/api/getAllProducts","/api/getProductById","/api/checkIfEmailExist","/api/checkIfUsernameExist","/api/logout").permitAll()
				.anyRequest().authenticated()
				.and().csrf()
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	}


	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/*", "/static/**", "index.html");
	}

}
