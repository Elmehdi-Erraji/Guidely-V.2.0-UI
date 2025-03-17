import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data['roles'] as Array<string>; // Get allowed roles
    const userRole = this.authService.getRole(); // Fetch user role from AuthService

    if (roles.includes(<string>userRole)) {
      return true;
    }
    this.router.navigate(['dashboard/auth/login']); // Redirect if unauthorized
    return false;
  }
}
