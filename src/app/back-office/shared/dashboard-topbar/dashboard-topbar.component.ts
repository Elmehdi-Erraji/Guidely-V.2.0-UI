import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-topbar',

  templateUrl: './dashboard-topbar.component.html',
  styleUrl: './dashboard-topbar.component.css'
})
export class DashboardTopbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    // Navigate to the login page after logging out
    this.router.navigate(['/dashboard/auth/login']);
  }
}
