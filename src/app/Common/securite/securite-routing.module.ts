import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilComponent} from "./components/profil/profil.component";
import {AccesComponent} from "./components/acces/acces.component";
import {ActionComponent} from "./components/action/action.component";
import {FonctionnaliteComponent} from "./components/fonctionnalite/fonctionnalite.component";
import {ModuleComponent} from "./components/module/module.component";
import {authGuard} from "../../guards/auth.guard";


const routes: Routes = [
  { path: 'acces', component: AccesComponent, canActivate: [authGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },
  { path: 'actions', component: ActionComponent, canActivate: [authGuard] },
  { path: 'fonctionnalites', component: FonctionnaliteComponent, canActivate: [authGuard] },
  { path: 'modules', component: ModuleComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuriteRoutingModule { }
