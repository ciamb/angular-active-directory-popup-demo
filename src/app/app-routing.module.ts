import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MsalGuard} from "@azure/msal-angular";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m=> m.HomeModule),
    canActivate: [MsalGuard]
  },

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
