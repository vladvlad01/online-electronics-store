import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {ProductModel} from "./product-settings/product.model";
import {CartModel} from "./Cart.model";



@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private urls = {
    saveProduct: "/api/saveProduct",
    getAllProducts: "/api/getAllProducts",
    deleteProduct: "/api/deleteProduct",
    saveInCart: "/api/saveInCart",
    getCartByUsername: "/api/getCartByUsername",
    getProductsForCart: "/api/getProductsForCart",
    getProductById: "/api/getProductById",
  };

  productsInCart:CartModel;

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.urls.getAllProducts);
  }


  saveProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(this.urls.saveProduct, product, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    });
  }

  deleteProduct(productId: number): Observable<string> {
    const url = `${this.urls.deleteProduct}/${productId}`;
    return this.httpClient.delete<string>(url);
  }

  saveCart(cart: CartModel): Observable<CartModel> {
    return this.httpClient.post<CartModel>(this.urls.saveInCart, cart, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    });
  }

  getCartByUsername(username: string): Observable<CartModel> {
    return this.httpClient.get<CartModel>(
      this.urls.getCartByUsername,
      {
        params: { username },
      }
    );
  }
  getProductsForCart(username: string): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(
      this.urls.getProductsForCart,
      {
        params: { username },
      }
    );
  }

  getProductById(productId: string): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(
      this.urls.getProductById,
      {
        params: { productId },
      }
    );
  }



}
