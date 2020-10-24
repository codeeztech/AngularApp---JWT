import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:3000/users/';
  getAll() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  getUser(username: String, password: String): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl + "validateLogin/"}${username}/${password}`);
  }
  getCurrentUser(username: String): Observable<any> {
    return this.http.get(`${this.baseUrl + "validateCurrentUser/"}${username}`);
  }
}