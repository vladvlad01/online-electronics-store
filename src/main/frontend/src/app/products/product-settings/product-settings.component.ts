import { Component, OnInit } from '@angular/core';
import {ProductModel} from "./product.model";
import {ProductsService} from "../products.service";
import {AppService} from "../../shared/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.css'],
  providers:[ProductsService]
})
export class ProductSettingsComponent implements OnInit {

  productsList:ProductModel[] = [];
  phoneProduct:ProductModel;
  phoneSuccessAdded = false;
  phoneError = false;
  phoneDeleted = false;

  constructor(private productService:ProductsService,private appService:AppService,private router:Router) { }

  ngOnInit() {
    this.appService.extractCredentialsFromLocalStorage();
    if(!this.authenticated()){
      this.router.navigate(["/login"]);
      return;
    }

    if(!this.appService.checkAuthorities()){

      this.router.navigate(["/notAuthorized"]);
      return;
    }

    this.initializeProduct();
    this.productService.getAllProducts().subscribe((response:ProductModel[]) =>{
          if(response.length > 0 || response == null){
            this.productsList = response;
          }
    })

  }

    onAddProduct(){
    let flag = true;

    this.productService.saveProduct(this.phoneProduct).subscribe(response =>{
      if(response != null){

        this.productsList.forEach((product, index) => {
          if (product.id == response.id) {
            this.productsList[index] = response;
            flag = false;
          }
        });

        if (flag) {
          this.productsList.push(response);
        }

        this.initializeProduct();
        this.phoneSuccessAdded = true;
      }
    },error1 => this.phoneError = true);
     this.setActionsToOff();
    }


  onEditProduct(id:number){
    this.phoneProduct = this.productsList.find(product => product.id == id);
  }

    initializeProduct(){
      this.phoneProduct = new ProductModel(null,null,null,null,null,"Bill Pay",null,null,null,null,0);
    }

  setActionsToOff() {
    setTimeout(() => {
      this.phoneError = false;
      this.phoneSuccessAdded = false;
      this.phoneDeleted = false;
    }, 2500);
  }

  onDeleteProduct(id:number){
      this.productService.deleteProduct(id).subscribe(response =>{
        if(response === "DELETED"){
          this.phoneDeleted = true;
        }else{
          this.phoneError = false;
        }
      });
    this.setActionsToOff();
  }

  authenticated(){
    return this.appService.authenticated;
  }

}
