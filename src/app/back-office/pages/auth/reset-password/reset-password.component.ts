import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    // Build a reactive form with only password fields and a hidden token field.
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      token: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Extract the reset token from query parameters and patch it into the form.
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
        this.resetForm.patchValue({ token: this.token });
        console.log('Reset token:', this.token);
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.errorMessage = 'Please ensure all fields are correctly filled and passwords match.';
      return;
    }
    this.errorMessage = null;
    this.isLoading = true;

    const { token, password, password_confirmation } = this.resetForm.value;
    const payload = { token, newPassword: password, confirmPassword: password_confirmation };

    console.log('Sending reset payload:', payload);
    this.authService.resetPassword(payload).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successfully',
          text: 'Your password has been updated successfully.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['dashboard/auth/login']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Reset failed. The token may be invalid or expired.';
        console.error('Reset error:', err);
      }
    });
  }
}
