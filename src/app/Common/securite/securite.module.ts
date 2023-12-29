import {NgModule} from '@angular/core';

import {SecuriteRoutingModule} from './securite-routing.module';
import {AccesComponent} from "./components/acces/acces.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {ActionComponent} from "./components/action/action.component";
import {FonctionnaliteComponent} from "./components/fonctionnalite/fonctionnalite.component";
import {ModuleComponent} from "./components/module/module.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    AccesComponent,
    ProfilComponent,
    ActionComponent,
    FonctionnaliteComponent,
    ModuleComponent
  ],
  imports: [
    SharedModule,
    SecuriteRoutingModule
  ]
})
export class SecuriteModule { }
