import {NgModule} from '@angular/core';

import {SecuriteRoutingModule} from './securite-routing.module';
import {AccesComponent} from "./components/acces/acces.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {ActionComponent} from "./components/action/action.component";
import {FonctionnaliteComponent} from "./components/fonctionnalite/fonctionnalite.component";
import {ModuleComponent} from "./components/module/module.component";
import {SharedModule} from "../shared/shared.module";
import {SharedDialogsModule} from "../shared-dialogs/shared-dialogs.module";
import {ActionFormDialogComponent} from './dialogs/action-form-dialog/action-form-dialog.component';
import {NouveauModuleComponent} from './dialogs/nouveau-module/nouveau-module.component';
import {NouvelleFonctionnaliteComponent} from './dialogs/nouvelle-fonctionnalite/nouvelle-fonctionnalite.component';


@NgModule({
  declarations: [
    AccesComponent,
    ProfilComponent,
    ActionComponent,
    FonctionnaliteComponent,
    ModuleComponent,
    NouveauModuleComponent,
    NouvelleFonctionnaliteComponent,
    ModuleComponent,
    ActionFormDialogComponent
  ],
  imports: [
    SharedModule,
    SharedDialogsModule,
    SecuriteRoutingModule
  ]
})
export class SecuriteModule { }
