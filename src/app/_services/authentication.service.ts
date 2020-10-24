import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../_models';
import { UserService } from '../_services/user.service'


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: Observable<User>;
    private baseUrl = 'http://localhost:3000/users/';
    loginUser: User;

    constructor(private http: HttpClient, private router: Router) {
    }

    login(user) {
        return this.http.post<any>(`${this.baseUrl + "login"}`, user)
    }

    loggedIn() {
        return !!localStorage.getItem('token')
    }

    getToken() {
        console.log("Authenticate Token:" + localStorage.getItem('token'))
        return localStorage.getItem('token')
    }
    logoutUser() {
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
    }
}