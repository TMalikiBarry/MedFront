import {NgModule} from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import {PrestationComponent} from "./components/prestation/prestation.component";
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";
import {DossiersRoutingModule} from "./dossiers-routing.module";
import { PrestationFormDialogComponent } from './dialogs/prestation-form-dialog/prestation-form-dialog.component';

import { RendezVousFormDialogComponent } from './dialogs/rendez-vous-form-dialog/rendez-vous-form-dialog.component';
import { DetailRendezVousComponent } from './dialogs/detail-rendez-vous/detail-rendez-vous.component';
import { DetailRdvPatientComponent } from './dialogs/detail-rdv-patient/detail-rdv-patient.component';


@NgModule({
  declarations: [
    PrestationComponent,
    RendezVousComponent,
    PrestationFormDialogComponent,
    RendezVousFormDialogComponent,
    DetailRendezVousComponent,
    DetailRdvPatientComponent
  ],
  imports: [
    SharedModule,
    DossiersRoutingModule,
  ]
})
export class DossiersModule { }
