import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products/products.service";
import {AppService} from "../shared/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private productService:ProductsService,private appService: AppService,private router:Router) { }

  ngOnInit(){
    this.appService.extractCredentialsFromLocalStorage();

    if(this.appService.authenticated){
      this.productService.getCartByUsername(this.appService.user.name).subscribe(response =>{
        this.productService.productsInCart = response;
      })
    }else{
      this.router.navigate(['/login'])
    }

  }

  logout(){
    this.appService.logout().subscribe(response =>{

      if(response === 'SUCCESS'){
        this.appService.logOutSuccess = true;
        this.appService.authenticated = false;
        this.appService.user = null;

        localStorage.removeItem("authenticated");
        localStorage.removeItem("user");

        this.router.navigateByUrl('/login');
      }

    })
  }

  checkLogout(){
    return this.appService.logOutSuccess;
  }

  authenticated(){
    return this.appService.authenticated;
  }

  onlineUser(){
    return this.appService.user.name;
  }



}
