import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginModel} from "../login/login.model";
import {Router} from "@angular/router";
import {UserModel} from "../login/User.model";
import {ProductModel} from "../products/product-settings/product.model";
import {AddressModel} from "../address-settings/Address.model";


@Injectable({providedIn: 'root'})
export class AppService {


  constructor(private httpClient: HttpClient,private  router:Router) {

  }

  private registerUrl = 'api/register';
  private logoutUrl = 'api/logout';
  private loginUrl = 'api/user';
  private checkLoginUrl = 'api/checkLogIn';
  private checkIfUserExist = "api/checkIfUsernameExist";
  private checkIfEmailExist = "api/checkIfEmailExist";
  private saveAddressUrl = "api/saveAccountAddress";
  private getAddressUrl = "api/getAccountAddress";


  user : UserModel = null;
  authenticated = false;
  loginError = false;
  logOutSuccess = false;

  redirectUrl: string;


  authenticate(loginModel: LoginModel): Observable<any>{

    let headers = new HttpHeaders();
    headers = headers.append('Authorization' , 'Basic '  + btoa(loginModel.username + ':' + loginModel.password));
    headers = headers.append('X-Requested-With', 'XMLHttpRequest');

    return this.httpClient.get<any>(this.loginUrl,{headers: headers});
  }

  isAuthenticated(){
    const promise = new Promise(
      (resolve, reject) => {
          this.httpClient.post(this.checkLoginUrl,{}).subscribe(
            response =>{
              if(response !== 'FAIL'){
                this.authenticated = response['authenticated'];
                this.user = new UserModel(response['name'],response['authorities']);

                if(this.redirectUrl) {
                  this.router.navigate([this.redirectUrl]);
                }

              }
            }
          );
          resolve(this.authenticated)
        }
    );

     return promise;

    }


  registerAccount(accountDetails:JSON): Observable<string>{
    return this.httpClient.post<string>(this.registerUrl,accountDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'responseType' : 'json'
      })
    });
  }


  logout(): Observable<any>{
    return this.httpClient.post(this.logoutUrl,{});
  }

  checkAuthorities():boolean{
    if(this.user.authorities.find(x => x.authority === "ROLE_ADMIN")){
      return true;
    }
    return false;
  }

  extractCredentialsFromLocalStorage(){
    this.authenticated = JSON.parse(localStorage.getItem("authenticated"));
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  checkIfUsernameExist(username: string): Observable<string> {
    return this.httpClient.get<string>(
      this.checkIfUserExist,
      {
        params: { username },
      }
    );
  }

  checkIfEmailsExist(email: string): Observable<string> {
    return this.httpClient.get<string>(
      this.checkIfEmailExist,
      {
        params: { email },
      }
    );
  }

  saveAddress(addressDetails:JSON): Observable<AddressModel>{
    return this.httpClient.post<AddressModel>(this.saveAddressUrl,addressDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'responseType' : 'json'
      })
    });
  }

  getAccountAddress(): Observable<any> {
    return this.httpClient.get<any>(
      this.getAddressUrl,
    );
  }

}
