import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase-default.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  supabase: any = null;
  constructor(private authService: SupabaseService) {
    this.supabase = this.authService.supabase;
  }


  async signIn(email: string, password: string) {
    await this.supabase
  }
}
