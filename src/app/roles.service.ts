import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl = 'http://localhost:3000/roles/';

  constructor(private http: HttpClient) { }

  getRole(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createRole(Role: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl+'add'}`, Role);
  }

  updateRole(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl+'update'}/${id}`, value);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl+'delete'}/${id}`, { responseType: 'text' });
  }

  getrolesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
