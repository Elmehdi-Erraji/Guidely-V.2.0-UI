import { frontOfficeRoutes } from './front-office/front-office.routes';
import { Routes } from '@angular/router';

export const routes: Routes = [
  ...frontOfficeRoutes,
  { path: '', redirectTo: 'front-office/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'front-office/home' }
];
