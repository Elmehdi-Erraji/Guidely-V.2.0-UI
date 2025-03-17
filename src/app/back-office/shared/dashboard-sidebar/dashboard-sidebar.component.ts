import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [
    NgIf
  ],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
})
export class DashboardSidebarComponent {

  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    console.log('user role:', this.userRole);
  }
}
