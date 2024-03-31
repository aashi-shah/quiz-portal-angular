
import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";




@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.loginService.getToken();
    let authReq = req;
    if(token != null && token != ""){
      authReq = authReq.clone({setHeaders:{Authorization:`${token}`}})
    }
    return next.handle(authReq);
  }

}

export const authInterceptorProvider=[
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }
]
