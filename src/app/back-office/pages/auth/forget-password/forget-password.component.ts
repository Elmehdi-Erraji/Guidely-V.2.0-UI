import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  resetForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.errorMessage = 'Please enter a valid email.';
      return;
    }
    this.errorMessage = null;
    this.isLoading = true;
    const { email } = this.resetForm.value;
    this.authService.forgetPassword(email).subscribe({
      next: (response) => {
        console.log('Reset password request successful:', response);
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Reset Email Sent',
          text: 'Please check your email for the password reset link.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // Navigate to the reset password page if needed or to login page
          this.router.navigate(['dashboard/auth/login']);
        });
      },
      error: (err) => {
        console.error('Reset password error:', err);
        this.errorMessage = "Email doesn't exist";
        this.isLoading = false;
      }
    });
  }
}
