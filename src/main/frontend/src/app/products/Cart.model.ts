import {CartProductModel} from "./CartProduct.model";

export class CartModel {
  id:number;
  username:string;
  productList:CartProductModel[];


  constructor(id: number, username: string, productList: CartProductModel[]) {
    this.id = id;
    this.username = username;
    this.productList = productList;
  }
}
