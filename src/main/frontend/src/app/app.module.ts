import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProductsComponent } from './products/products.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductSettingsComponent } from './products/product-settings/product-settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductsService} from "./products/products.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import {NeedAuthGuard} from "./shared/needAuthGuard.service";
import {XhrInterceptor} from "./shared/xhrInterceptor";
import {Error401interceptor} from "./shared/error401interceptor";
import {AppService} from "./shared/app.service";
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AddressSettingsComponent } from './address-settings/address-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    ProductsComponent,
    NavigationComponent,
    ProductSettingsComponent,
    ShoppingCartComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    NotAuthorizedComponent,
    AddressSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService,
    AppService,
    NeedAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Error401interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
