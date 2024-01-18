import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import {CommonNavbarComponent} from "./Common/admin-layout/common-navbar/common-navbar.component";

const routes: Routes = [
  { path: 'login', component: AuthentificationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: CommonNavbarComponent,
    loadChildren: () => import('./Common/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
