import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ProductsComponent} from "./products/products.component";
import {ProductSettingsComponent} from "./products/product-settings/product-settings.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductDetailsComponent} from "./products/product-details/product-details.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NeedAuthGuard} from "./shared/needAuthGuard.service";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {AddressSettingsComponent} from "./address-settings/address-settings.component";


const appRoutes: Routes = [
   { path: "", component: HomeComponent },
   { path: "products", component: ProductsComponent },
   { path: "productsSettings", component: ProductSettingsComponent },
   { path: "addressSettings", component: AddressSettingsComponent },
   { path: "shoppingCart", component: ShoppingCartComponent,canActivate: [NeedAuthGuard] },
   { path: "products/:productId", component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notAuthorized', component: NotAuthorizedComponent },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" },
  },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [

    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
