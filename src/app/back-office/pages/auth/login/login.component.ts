import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onSubmit() {
    // Handle login logic here (e.g., call a service, validate credentials, etc.)
    console.log('Login form submitted');
  }
}
