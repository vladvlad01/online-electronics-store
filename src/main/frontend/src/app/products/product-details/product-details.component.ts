import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {ProductModel} from "../product-settings/product.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CartProductModel} from "../CartProduct.model";
import {CartModel} from "../Cart.model";
import {AppService} from "../../shared/app.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productSelected:ProductModel;
  readonly = true;
  constructor(private productService:ProductsService,private route:ActivatedRoute,private router:Router,private appService:AppService) {

  }

  ngOnInit() {

    this.appService.extractCredentialsFromLocalStorage();

     this.route.params.subscribe((param:Params) =>{

       if(!this.authenticated()){
         this.router.navigate(['/login']);
         return;
       }

       const productId = param['productId'];
       this.productService.getProductById(productId).subscribe(response =>{
         if(response != null){
           this.productSelected = response;
         }else{
           this.router.navigate(['/not-found'])
         }
       },error1 => this.router.navigate(['/not-found']))
     })
  }

  onAddToCart(productId:number){

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


  continueShopping(){
    this.router.navigate(['/products']);
  }

  authenticated(){
    return this.appService.authenticated;
  }

}
