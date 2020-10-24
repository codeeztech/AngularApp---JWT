import { Injectable ,Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthenticationService} from './_services/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector : Injector) { }

 
  intercept(req,next){
    let authService = this.injector.get(AuthenticationService);
    
    let tokenizedReq  = req.clone({
      setHeaders : {
         'Content-Type' : 'application/json; charset=utf-8',
         'Accept'       : 'application/json',
          'Authorization' : `Bearer ${authService.getToken()}`
       // headers: new HttpHeaders({'Authorization', authService.getToken()})
      },
    })
    return next.handle(tokenizedReq);
  }
}
