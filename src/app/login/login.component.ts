import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginUserData = new User();
    error = '';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {

    }

    loginUser() {
        console.log("username: " + this.loginUserData.username);
        console.log("password: " + this.loginUserData.password);


        this.authenticationService.login(this.loginUserData).subscribe(
            res => {
                console.log("response token:" + res.token)
                localStorage.setItem("token", res.token)
                sessionStorage.setItem('loggedUser', this.loginUserData.username);
                window.location.reload();
                this.router.navigate(["/flights"])

                this.error = res.statusText
            },
            err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        console.log("Login Error: " + err.statusText)
                        console.log("Login Error: " + err.error)
                        this.error = err.error
                    }
                }
            }
        )
    }
}
