import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = 'http://localhost:3000/flights/';

  constructor(private http: HttpClient) { }

  getflight(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createflight(flight: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl+'add'}`, flight);
  }

  updateflight(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl+'update'}/${id}`, value);
  }

  deleteflight(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl+'delete'}/${id}`, { responseType: 'text' });
  }

  getflightsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
