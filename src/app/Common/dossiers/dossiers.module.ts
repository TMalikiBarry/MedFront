import {NgModule} from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import {PrestationComponent} from "./components/prestation/prestation.component";
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";
import {FicheMedicaleComponent} from "../personnes/components/fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "../personnes/components/dossiers-medicaux/dossiers-medicaux.component";
import {DossiersRoutingModule} from "./dossiers-routing.module";
import { PrestationFormDialogComponent } from './dialogs/prestation-form-dialog/prestation-form-dialog.component';


@NgModule({
  declarations: [
    PrestationComponent,
    RendezVousComponent,
    PrestationFormDialogComponent
  ],
  imports: [
    SharedModule,
    DossiersRoutingModule,
  ]
})
export class DossiersModule { }
