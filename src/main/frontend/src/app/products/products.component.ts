import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./products.service";
import {ProductModel} from "./product-settings/product.model";
import {CartModel} from "./Cart.model";
import {CartProductModel} from "./CartProduct.model";
import {Router} from "@angular/router";
import {AppService} from "../shared/app.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList:ProductModel[] = [];
  readonly = true;

  brandFilter = "Select a brand";
  categoryFilter = "Prepay";
  ratingFilter = "0";
  constructor(private productService:ProductsService,private router:Router,private appService:AppService) { }

  ngOnInit() {
    this.appService.extractCredentialsFromLocalStorage();

    this.productService.getAllProducts().subscribe(response =>{
      if(response.length > 0){
        this.productsList = response;
      }
    })

  }

 onAddOnCart(productId:number){
    if(!this.authenticated()){
      this.router.navigate(['/login']);
      return;
    }

   let cartProducts:CartProductModel[] = [];
   let cartId = null;
       if(this.productService.productsInCart != null){
     cartProducts = this.productService.productsInCart.productList;
     cartId = this.productService.productsInCart.id;
   }

   cartProducts.push(new CartProductModel(productId));

    const cart:CartModel = {id:cartId,username:this.appService.user.name,productList:cartProducts};

    this.productService.saveCart(cart).subscribe(response =>{
      this.productService.productsInCart = response;
    });

 }

  onSelectProduct(product:ProductModel){
    this.router.navigate(["/products",product.id]);
  }

  onRatingFilter(){
    this.productService.getAllProducts().subscribe(response =>{
      if(response.length > 0){
        this.productsList = response;
        this.productsList = this.productsList.filter(product => product.rating == +this.ratingFilter);
      }
    });
  }

  onBrandFilter(){
    this.productService.getAllProducts().subscribe(response =>{
      if(response.length > 0){
        this.productsList = response;
        this.productsList = this.productsList.filter(product => product.phoneBrand === this.brandFilter);
      }
    });
  }

  onCategoryFilter(){
    this.productService.getAllProducts().subscribe(response =>{
      if(response.length > 0){
        this.productsList = response;
        this.productsList = this.productsList.filter(product => product.phoneCategory === this.categoryFilter);
      }
    });
  }


  onResetFilter(){
    this.productService.getAllProducts().subscribe(response =>{
      if(response.length > 0){
        this.productsList = response;
      }
    });
  }

  authenticated(){
    return this.appService.authenticated;
  }

}

