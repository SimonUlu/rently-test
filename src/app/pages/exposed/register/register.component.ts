import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterUser } from 'src/app/services/register/register.service';
import { SupabaseService } from 'src/app/services/supabase-default.service';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: RegisterUser;
  loading = false;
  user_vname: string  = "";
  user_nname: string = "";
  user_email: string = "";
  user_password: string = "";


  signInForm = this.formBuilder.group({
    email: '',
    password: '',
    name_first: '',
    name_last: ''
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}



  async createUser():Promise<void> {
    this.registerService.signUp(this.signInForm.value.email!, this.signInForm.value.password!, this.signInForm.value.name_first!, this.signInForm.value.name_last!)
  }

}
