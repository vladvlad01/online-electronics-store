import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {AppService} from "./app.service";
import {Injectable} from "@angular/core";

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private appService: AppService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.appService.isAuthenticated().then(
         (authenticated: boolean)=>{
           if(authenticated){
             this.appService.redirectUrl = null;
             return true;
           }else{
             this.appService.redirectUrl = state.url;
             this.router.navigate(['/login']);
             return false;
           }
         }
       );

  }



}
