import { keyframes } from '@angular/animations';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService, User } from '../services/supabase-default.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User | undefined;


  constructor(
    private readonly authService: SupabaseService,
    private readonly router: Router,
    private location: Location
  ) {}

  async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

      const isSignedIn = !!(await this.authService.getSession())?.user
      // If not signed in, redirect to login page
      if (!isSignedIn) {
        this.router.navigate(['/login']);
        // If route is protected by user role or permission
      }
  }

}
