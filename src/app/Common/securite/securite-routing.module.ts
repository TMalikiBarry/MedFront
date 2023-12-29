import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccesComponent} from "./acces/acces.component";
import {ProfilComponent} from "./profil/profil.component";
import {ActionComponent} from "./action/action.component";
import {FonctionnaliteComponent} from "./fonctionnalite/fonctionnalite.component";
import {ModuleComponent} from "./module/module.component";

const routes: Routes = [
  { path: 'acces', component: AccesComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'actions', component: ActionComponent},
  { path: 'fonctionnalites', component: FonctionnaliteComponent},
  { path: 'modules', component: ModuleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuriteRoutingModule { }
