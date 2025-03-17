import { Routes } from '@angular/router';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {DashboardLayoutComponent} from './layout/dashboard-layout/dashboard-layout.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {ForgetPasswordComponent} from './pages/auth/forget-password/forget-password.component';
import {ResetPasswordComponent} from './pages/auth/reset-password/reset-password.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RoleGuard} from '../core/guards/role.guard';
import {AuthGuard} from '../core/guards/auth.guard';
import {AgentHomeComponent} from './pages/dashboard/agent/agent-home/agent-home.component';
import {UserHomeComponent} from './pages/dashboard/client/user-home/user-home.component';
import {AdminHomeComponent} from './pages/dashboard/admin/admin-home/admin-home.component';

export const backOfficeRoutes: Routes = [
  {
    path: 'dashboard/auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent},
      { path: 'forgetPassword', component: ForgetPasswordComponent},
      { path: 'PasswordReset', component: ResetPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      // Admin routes
      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
        children: [
          { path: '', component: AdminHomeComponent }
        ]
      },
      {
        path: 'support_agent',
        canActivate: [RoleGuard],
        data: { roles: ['SUPPORT_AGENT'] },
        children: [
          { path: 'welcome', component: AgentHomeComponent }
        ]
      },
      // User routes
      {
        path: 'user',
        canActivate: [RoleGuard],
        data: { roles: ['USER'] },
        children: [
          { path: 'welcome', component: UserHomeComponent }
        ]
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }


];
