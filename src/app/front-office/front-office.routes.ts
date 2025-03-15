import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import {FrontOfficeLayoutComponent} from './layout/front-office-layout/front-office-layout.component';

export const frontOfficeRoutes: Routes = [
  {
    path: 'front-office',
    component: FrontOfficeLayoutComponent,
    data: { preload: true }, // For custom preloading
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { preload: true } },
      { path: 'about', component: AboutComponent, data: { preload: true } },
      { path: 'contact', component: ContactComponent, data: { preload: true } }
    ]
  }
];
