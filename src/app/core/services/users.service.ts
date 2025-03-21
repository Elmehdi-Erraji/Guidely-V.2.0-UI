import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:4040/api/users';

  constructor(private http: HttpClient) { }

  getUserById(id: string) :Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`);
  }
}
