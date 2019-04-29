import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products/products.service";
import {ProductModel} from "../products/product-settings/product.model";
import {Router} from "@angular/router";
import {AppService} from "../shared/app.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productsToBeBought:ProductModel[] = [];
  total:number = 0;
  calculateTotal = false;

  constructor(private productService:ProductsService,private router:Router,private appService:AppService) { }

  ngOnInit() {
    this.appService.extractCredentialsFromLocalStorage();

    if(!this.appService.authenticated){
      this.router.navigate(["/login"]);
      return;
    }

    this.productService.getProductsForCart(this.appService.user.name).subscribe(response =>{
      if(response.length > 0 || response != null){
        this.productsToBeBought = response;
        this.initializeSubTotal();
      }
    })
  }
  onChangeQuantity(event,product:ProductModel){
    let price = (product.discountedPrice > 0) ? product.discountedPrice:product.phonePrice;
    product.subtotal = +event.target.value * price;
    this.calculateTotal = false;
  }

  initializeSubTotal(){
    this.productsToBeBought.forEach(product =>{
      if(product.discountedPrice > 0){
        product.subtotal = product.discountedPrice;
      }else{
        product.subtotal = product.phonePrice;
      }
    });
  }

  onDeleteProduct(index){
    //get the productId of the product which will be deleted
    let productDeletedId = this.productsToBeBought[index].id;
    //delete the specific product from the shopping cart
    this.productsToBeBought.splice(index,1);
    //get the cartModel object by the productId
    let cartModel = this.productService.productsInCart.productList.find(x => x.productId == productDeletedId);
    //delete the productId from the products cart.
    this.productService.productsInCart.productList.splice(this.productService.productsInCart.productList.indexOf(cartModel),1);

    this.calculateTotal = false;
  }

  updateTotal(){
    this.total = 0;
    this.productsToBeBought.forEach(product =>{
        this.total += product.subtotal;
    });
    this.calculateTotal = true;
  }

  continueShopping(){
    this.router.navigate(['/products']);
  }
}
