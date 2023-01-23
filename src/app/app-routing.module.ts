import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login',
    loadChildren: () => import('./pages/exposed/login/login.module').then(m => m.LoginModule),
    // canActivate: [AuthGuard]
  },
  { path: 'account-edit',
    loadChildren: () => import('./pages/secure/account/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  { path: 'register',
    loadChildren: () => import('./pages/exposed/register/register.module').then(m => m.RegisterModule),
    // canActivate: [AuthGuard]
  },
  { path: 'dashboard',
    loadChildren: () => import('./pages/secure/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]

  },
  { path: 'account-edit', loadChildren: () => import('./pages/secure/account/account-edit/account-edit.module').then(m => m.AccountEditModule) },
  { path: 'account-details', loadChildren: () => import('./pages/secure/account/account-details/account-details.module').then(m => m.AccountDetailsModule) }
      // { path: 'account-edit', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
