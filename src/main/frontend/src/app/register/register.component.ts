import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AppService} from "../shared/app.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  registeredSuccess = false;
  registeredError = false;

  constructor(private appService:AppService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required,this.checkIfUserExist.bind(this)),
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email],this.checkIfEmailExist.bind(this)),
      phonePrefix: new FormControl("089", Validators.required),
      phoneSuffix: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
      securityQuestion: new FormControl("What is your born city?", Validators.required),
      securityAnswer: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.appService.registerAccount(this.registerForm.value).subscribe(response => {
     if(response === "REGISTERED"){
       this.registeredSuccess = true;
     }else{
       this.registeredError = true;
     }
    },error1 => this.registeredError = true);
    this.setActionsToOff();
    this.registerForm.reset();
  }

  setActionsToOff() {
    setTimeout(() => {
     this.registeredSuccess = false;
     this.registeredError = false;
    }, 2500);
  }

  //async validator for the email. (it checks if the email exist in the database)
  checkIfEmailExist(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {

      this.appService.checkIfEmailsExist(control.value).subscribe(response =>{
        console.log(response);
        if(response === 'PASS'){
          resolve(null);
        } else {
          resolve({'emailExist': true});
        }
      });

    });
    return promise;
  }

  //async validator for the user. (it checks if the user exist in the database)
  checkIfUserExist(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {

      this.appService.checkIfUsernameExist(control.value).subscribe(response =>{
        if(response === 'PASS' && control.value.toString().length >= 4){
          resolve(null);
        } else {
          resolve({'usernameExist': true});
        }
      });

    });
    return promise;
  }

}

