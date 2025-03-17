import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {
  constructor(private authService: AuthService) {}

  resolve(): Observable<any> {
    return this.authService.getProfile().pipe(
      tap(data => console.log('Profile data from resolver:', data))
    );
  }
}
