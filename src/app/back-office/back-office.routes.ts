import { Routes } from '@angular/router';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {DashboardLayoutComponent} from './layout/dashboard-layout/dashboard-layout.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {ForgetPasswordComponent} from './pages/auth/forget-password/forget-password.component';
import {ResetPasswordComponent} from './pages/auth/reset-password/reset-password.component';
import {ProfileComponent} from './pages/dashboard/profile/profile.component';
// Example dashboard pages

export const backOfficeRoutes: Routes = [
  // Auth Routes: these use the auth layout
  {
    path: 'dashboard/auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent},
      { path: 'forgetPassword', component: ForgetPasswordComponent},
      { path: 'PasswordReset', component: ResetPasswordComponent },
      { path: 'profile', component: ProfileComponent },

      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },

      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // Dashboard Routes: these use the dashboard layout
 /* {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }*/
];
