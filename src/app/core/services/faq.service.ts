import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Faq {
  id?: string;
  question: string;
  answer: string;
  createdById: string;
  categoryId: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private apiUrl = 'http://localhost:4040/api/faqs';

  constructor(private http: HttpClient) {}

  getFaqs(page: number = 0, size: number = 1000): Observable<Page<Faq>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Faq>>(this.apiUrl, { params })
      .pipe(
        catchError(err => {
          console.error('Error fetching FAQs', err);
          return throwError(() => new Error('Error fetching FAQs, please try again later.'));
        })
      );
  }

  getFaqById(id: string): Observable<Faq> {
    return this.http.get<Faq>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error fetching FAQ by id', err);
          return throwError(() => new Error('Error fetching FAQ details, please try again later.'));
        })
      );
  }

  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.apiUrl, faq)
      .pipe(
        catchError(err => {
          console.error('Error creating FAQ', err);
          return throwError(() => new Error('Error creating FAQ, please try again later.'));
        })
      );
  }

  updateFaq(id: string, faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${this.apiUrl}/${id}`, faq)
      .pipe(
        catchError(err => {
          console.error('Error updating FAQ', err);
          return throwError(() => new Error('Error updating FAQ, please try again later.'));
        })
      );
  }

  deleteFaq(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(err => {
          console.error('Error deleting FAQ', err);
          return throwError(() => new Error('Error deleting FAQ, please try again later.'));
        })
      );
  }
}
