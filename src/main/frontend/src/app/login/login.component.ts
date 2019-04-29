import { Component, OnInit } from '@angular/core';
import {AppService} from "../shared/app.service";
import {NgForm} from "@angular/forms";
import {LoginModel} from "./login.model";
import {Router} from "@angular/router";
import {UserModel} from "./User.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService,private router:Router) {

    if(this.appService.logOutSuccess){
      setTimeout(() => {
        this.appService.logOutSuccess = false;
      }, 3500);
    }

  }


  ngOnInit() {
  }

  onSubmit(loginForm: NgForm){
    const loginM: LoginModel = loginForm.value;

      this.appService.authenticate(loginM).subscribe(response =>{
        this.appService.authenticated = true;
        this.appService.user = new UserModel(response['name'],response['authorities']);

        localStorage.removeItem("authenticated");
        localStorage.removeItem("user");
        localStorage.setItem("authenticated",JSON.stringify(this.appService.authenticated));
        localStorage.setItem("user",JSON.stringify(this.appService.user));
        this.router.navigateByUrl('/');
      })

  }

  authenticated(){
    return this.appService.authenticated;
  }

  loginError(){
    return this.appService.loginError;
  }


}
