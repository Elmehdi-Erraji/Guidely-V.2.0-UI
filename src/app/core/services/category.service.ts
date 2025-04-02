import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Category {
  id?: string;         // UUID from backend
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:4040/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl)
      .pipe(
        catchError(err => {
          console.error('Error fetching categories', err);
          return throwError(() => new Error('Error fetching categories, please try again later.'));
        })
      );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error fetching category by id', err);
          return throwError(() => new Error('Error fetching category details, please try again later.'));
        })
      );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category)
      .pipe(
        catchError(err => {
          console.error('Error creating category', err);
          return throwError(() => new Error('Error creating category, please try again later.'));
        })
      );
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category)
      .pipe(
        catchError(err => {
          console.error('Error updating category', err);
          return throwError(() => new Error('Error updating category, please try again later.'));
        })
      );
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error deleting category', err);
          return throwError(() => new Error('Error deleting category, please try again later.'));
        })
      );
  }
}
