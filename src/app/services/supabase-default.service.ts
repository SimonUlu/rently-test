import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'
// import { Database } from 'src/schema'

export interface Profile {
  id?: string /* primary key */;
  // email: string;
  // name_last: string;
  // name_first: string;
  avatar_url?: string;
  username: string;
  full_name: string;
  // avatar?: any;
  // company_id: number /* foreign key to companies.id */;
  // department_id?: number /* foreign key to departments.id */;
  // created_at?: string;
  // user_role_id: number /* foreign key to user_roles.id */;
  // needs_password_reset?: boolean;
}

export interface User {
  id?: string /* primary key */;
  email: string;
  name_last: string;
  name_first: string;
  avatar_url?: string;
  avatar?: any;
  company_id: number /* foreign key to companies.id */;
  department_id?: number /* foreign key to departments.id */;
  created_at?: string;
  user_role_id: number /* foreign key to user_roles.id */;
  needs_password_reset?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // Get session
  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.log(error);
    }
    return data?.session;
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  // SignIn
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return { user: data.user, session: data.user, error: error };
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }


  // Get current auth user
  async getAuthUser() {
    return (await this.supabase.auth.getUser())?.data;
  }

  // Get user roles
  async getUserRoles() {
    const { data, error } = await this.supabase.from('user_roles').select('*');

    return { data: data, error: error };
  }

  // Update password
  async updatePassword(user_id: string, password: string) {
    // Set new password
    const { data, error } = await this.supabase.auth.updateUser({
      password: password,
    });

    // Update user's reset password flag
    await this.supabase
      .from('users')
      .update({
        needs_password_reset: false,
      })
      .match({ id: user_id });

    return { user: data.user, error: error };
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }


  async createUser(user: User) {
    const { data, error } = await this.supabase
    .from('users')
    .insert([
      {
        name_first: user.name_first,
        name_last: user.name_last,
        email: user.email,
        avatar_url: user.avatar_url,
        avatar: user.avatar,
        created_at: user.created_at,
        user_role_id: user.user_role_id /* foreign key to user_roles.id */,
        needs_password_reset: user.needs_password_reset,
      },
    ])
    .select();

  return { data: data, error: error };
  }
}

export class SupabaseDefaultService {

}
