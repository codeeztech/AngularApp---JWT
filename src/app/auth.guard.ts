import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from './_services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private serviceAuthentication : AuthenticationService,
    private router : Router){}

    canActivate(): boolean{
      if(this.serviceAuthentication.loggedIn()){
          return true
      }
      else{
          this.router.navigate(['/login'])
          return false
      }
  }
  
}
