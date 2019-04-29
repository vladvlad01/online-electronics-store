import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AppService} from "./app.service";

@Injectable()
export class Error401interceptor implements HttpInterceptor{

constructor(private router:Router,private appService: AppService){

}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {

      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {

              let badError:string = error.error;
              if(badError.includes('Bad credentials')){
                this.appService.loginError = true;

                if(this.appService.loginError){
                  setTimeout(() => {
                    this.appService.loginError = false;
                  }, 3500);
                }

              }else{
                this.appService.loginError = false;
                this.router.navigateByUrl("/login");
            }
          }
        }

      })
    );
  }

}
