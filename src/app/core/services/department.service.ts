import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Department {
  id?: string; // assuming UUID string from backend
  name: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page index
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://localhost:4040/api/departments';

  constructor(private http: HttpClient) {}

  getDepartments(page: number = 0, size: number = 10, searchQuery?: string): Observable<Page<Department>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    // Optional: if your backend supports searching, add the search param.
    if (searchQuery) {
      params = params.set('search', searchQuery);
    }
    return this.http.get<Page<Department>>(this.apiUrl, { params })
      .pipe(
        catchError(err => {
          console.error('Error fetching departments', err);
          return throwError(() => new Error('Error fetching departments, please try again later.'));
        })
      );
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department)
      .pipe(
        catchError(err => {
          console.error('Error creating department', err);
          return throwError(() => new Error('Error creating department, please try again later.'));
        })
      );
  }

  getDepartmentById(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error fetching department by id', err);
          return throwError(() => new Error('Error fetching department details, please try again later.'));
        })
      );
  }

  updateDepartment(id: string, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department)
      .pipe(
        catchError(err => {
          console.error('Error updating department', err);
          return throwError(() => new Error('Error updating department, please try again later.'));
        })
      );
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error deleting department', err);
          return throwError(() => new Error('Error deleting department, please try again later.'));
        })
      );
  }
}
