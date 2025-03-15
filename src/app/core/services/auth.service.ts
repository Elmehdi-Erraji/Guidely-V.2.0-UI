import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:4040/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.baseUrl}/register`, body);
  }

  forgetPassword(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.baseUrl}/forgetPassword`, body);
  }

  resetPassword(payload: { token: string; newPassword: string; confirmPassword: string }): Observable<any> {
    // Ensure we only send token and newPassword.
    const body = new HttpParams()
      .set('token', payload.token)
      .set('newPassword', payload.newPassword);
    return this.http.post(`${this.baseUrl}/resetPassword`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
