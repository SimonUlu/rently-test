import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Profile, SupabaseService } from 'src/app/services/supabase-default.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  profile?: Profile;

  constructor(private accountService: AccountService, private supabase: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    await this.getUser();
  }

  async getUser() {
    const id = (await this.supabase.getSession())?.user.id;
    this.profile = (await this.accountService.getUser(id)).data;
    // console.log(id);
    // console.log(this.profile.full_name);
  }

}
