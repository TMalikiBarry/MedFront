import {NgModule} from '@angular/core';

import {DossiersRoutingModule} from './dossiers-routing.module';
import {PrestationComponent} from './prestation/prestation.component';
import {FicheMedicaleComponent} from './fiche-medicale/fiche-medicale.component';
import {DossiersMedicauxComponent} from './dossiers-medicaux/dossiers-medicaux.component';
import {RendezVousComponent} from "./rendez-vous/rendez-vous.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    PrestationComponent,
    RendezVousComponent,
    FicheMedicaleComponent,
    DossiersMedicauxComponent
  ],
  imports: [
    SharedModule,
    DossiersRoutingModule
  ]
})
export class DossiersModule { }
