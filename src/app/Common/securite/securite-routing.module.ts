import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilComponent} from "./components/profil/profil.component";
import {AccesComponent} from "./components/acces/acces.component";
import {ActionComponent} from "./components/action/action.component";
import {FonctionnaliteComponent} from "./components/fonctionnalite/fonctionnalite.component";
import {ModuleComponent} from "./components/module/module.component";


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
