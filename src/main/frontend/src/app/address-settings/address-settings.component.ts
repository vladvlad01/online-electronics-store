import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../shared/app.service";
import {AddressModel} from "./Address.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-address-settings',
  templateUrl: './address-settings.component.html',
  styleUrls: ['./address-settings.component.css']
})
export class AddressSettingsComponent implements OnInit {

  addressForm:FormGroup;
  address:AddressModel = new AddressModel(null,null,null,null,null,null);
  addressNotificationSuccess = false;
  addressNotificationError = false;
  constructor(private appService:AppService,private router:Router) { }

  ngOnInit() {
    this.appService.extractCredentialsFromLocalStorage();
    if(!this.appService.authenticated){
      this.router.navigate(['/login']);
      return;
    }

    this.initializeForm(this.address);
    this.appService.getAccountAddress().subscribe(response =>{
      if(response != null){
        this.address = response;
        this.initializeForm(this.address);
      }
    });


  }

  onSubmit(){
    this.appService.saveAddress(this.addressForm.value).subscribe(response =>{
      if(response != null){
        this.address = response;
        this.addressNotificationSuccess = true;
      }else{
        this.addressNotificationError = true;
      }
    },error1 => this.addressNotificationError = true);
    this.setActionsToOff();
  }

  onCancel(){
    this.addressForm.reset();
  }

  initializeForm(address:AddressModel){
    this.addressForm = new FormGroup({
      line1: new FormControl(address.line1, Validators.required),
      line2: new FormControl(address.line2),
      city: new FormControl(address.city, Validators.required),
      county: new FormControl(address.county, Validators.required),
      postcode: new FormControl(address.postcode),
      country: new FormControl(address.country, Validators.required),
    })
  }

  setActionsToOff() {
    setTimeout(() => {
      this.addressNotificationSuccess = false;
      this.addressNotificationError = false;
    }, 2500);
  }
}
