import { frontOfficeRoutes } from './front-office/front-office.routes';
import { Routes } from '@angular/router';
import {backOfficeRoutes} from './back-office/back-office.routes';

export const routes: Routes = [
  ...frontOfficeRoutes,
  ...backOfficeRoutes,
  { path: '', redirectTo: 'front-office/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'front-office/home' }
];
