import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { LoginComponent } from './pages/exposed/login/login.component'
import { AccountComponent } from './pages/secure/account/account/account.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'
import { LoginModule } from './pages/exposed/login/login.module';
import { IconComponent } from './components/icon/icon.component'

@NgModule({
  declarations: [AppComponent, IconComponent],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule, AppRoutingModule, LoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
