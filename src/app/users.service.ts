import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  getuser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createuser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl+'add'}`, user);
  }

  updateuser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl+'update'}/${id}`, value);
  }

  deleteuser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl+'delete'}/${id}`, { responseType: 'text' });
  }

  getusersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  
}
