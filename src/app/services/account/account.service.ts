import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase-default.service';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  supabase: any = null;
  constructor(private authService: SupabaseService) {
    this.supabase = this.authService.supabase;
  }


  async getUser(id?: string) {
    const { data, error} = await this.supabase
      .from('profiles')
      .select('*')
      .match({id: id})
    return { data: data[0], error: error };
  }


}
