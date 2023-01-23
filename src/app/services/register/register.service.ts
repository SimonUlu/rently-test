import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase-default.service';


export interface RegisterUser {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
}

@Injectable({
  providedIn: 'root'
})


export class RegisterService {

  supabase: any = null;
  constructor(private authService: SupabaseService) {
    this.supabase = this.authService.supabase;
  }

  async signUp(email: string, password: string, first_name: string, last_name: string) {
    await this.supabase.auth.signUp(
     {
       email: email,
       password: password,
       options: {
         data: {
           first_name: first_name,
           last_name: last_name
         }
       }
     }
    )
  }
}
