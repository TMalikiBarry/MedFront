import {NgModule} from '@angular/core';

import {SecuriteRoutingModule} from './securite-routing.module';
import {AccesComponent} from "./acces/acces.component";
import {ProfilComponent} from "./profil/profil.component";
import {SharedModule} from "../shared/shared.module";
import {ActionComponent} from './action/action.component';
import {FonctionnaliteComponent} from './fonctionnalite/fonctionnalite.component';
import {ModuleComponent} from './module/module.component';


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
