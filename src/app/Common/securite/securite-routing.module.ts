import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccesComponent} from "./acces/acces.component";
import {ProfilComponent} from "./profil/profil.component";

const routes: Routes = [
  { path: 'acces', component: AccesComponent},
  { path: 'profil', component: ProfilComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuriteRoutingModule { }
