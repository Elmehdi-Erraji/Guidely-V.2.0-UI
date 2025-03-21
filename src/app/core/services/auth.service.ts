import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

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

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found in localStorage.');
    }
    const headers = new HttpHeaders({
      'Authentication': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

}
