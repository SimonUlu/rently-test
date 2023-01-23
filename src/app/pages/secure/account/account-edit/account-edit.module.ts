import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountEditRoutingModule } from './account-edit-routing.module';
import { AccountEditComponent } from './account-edit.component';


@NgModule({
  declarations: [
    AccountEditComponent
  ],
  imports: [
    CommonModule,
    AccountEditRoutingModule
  ]
})
export class AccountEditModule { }
