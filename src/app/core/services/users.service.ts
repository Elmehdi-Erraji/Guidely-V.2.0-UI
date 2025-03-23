import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for user objects returned by the backend
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  roleName: string;
  departmentName: string | null;
  // Optional fields for internal use (if available)
  roleId?: string;
  departmentId?: string;
}

// Interface for the user data used when creating or updating a user
export interface UserRequest {
  name: string;
  email: string;
  password?: string;
  roleId: string;
  departmentId: string;
}

export interface Role {
  id: string;
  name: string;
}

// Generic interface for paginated responses
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (zero-indexed)
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:4040/api/users';

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/find/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error fetching user by ID', err);
          return throwError(() => new Error('Error fetching user, please try again later.'));
        })
      );
  }

  createUser(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/create`, user)
      .pipe(
        catchError(err => {
          console.error('Error creating user', err);
          return throwError(() => new Error('Error creating user, please try again later.'));
        })
      );
  }

  updateUser(id: string, user: UserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/update/${id}`, user)
      .pipe(
        catchError(err => {
          console.error('Error updating user', err);
          return throwError(() => new Error('Error updating user, please try again later.'));
        })
      );
  }

  findAllUsers(page: number, size: number): Observable<Page<UserResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<UserResponse>>(`${this.apiUrl}/findAll`, { params })
      .pipe(
        catchError(err => {
          console.error('Error fetching users', err);
          return throwError(() => new Error('Error fetching users, please try again later.'));
        })
      );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error deleting user', err);
          return throwError(() => new Error('Error deleting user, please try again later.'));
        })
      );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`)
      .pipe(
        catchError(err => {
          console.error('Error fetching roles', err);
          return throwError(() => new Error('Error fetching roles, please try again later.'));
        })
      );
  }
}
