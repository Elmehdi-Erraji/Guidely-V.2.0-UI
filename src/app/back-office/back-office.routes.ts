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
import {LogsComponent} from './pages/dashboard/admin/logs/logs.component';
import {CategoriesComponent} from './pages/dashboard/admin/categories/categories.component';
import {DepartmentsComponent} from './pages/dashboard/admin/departments/departments.component';
import {FaqAllComponent} from './pages/dashboard/faq-all/faq-all.component';
import {FaqComponent} from './pages/dashboard/admin/faq/faq.component';
import {UsersComponent} from './pages/dashboard/admin/users/users.component';

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
      { path: 'allFaq', component: FaqAllComponent },

      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
        children: [
          { path: '', component: AdminHomeComponent },
          { path: 'logs', component: LogsComponent },
          { path: 'categories', component: CategoriesComponent },
          { path: 'departments', component: DepartmentsComponent },
          { path: 'faq', component: FaqComponent },
          { path: 'users', component: UsersComponent}

        ]
      },
      {
        path: 'support_agent',
        canActivate: [RoleGuard],
        data: { roles: ['SUPPORT_AGENT'] },
        children: [
          { path: '', component: AgentHomeComponent }
        ]
      },

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
