import {NgModule} from '@angular/core';


import {SharedModule} from "../shared/shared.module";
import {PrestationComponent} from "./components/prestation/prestation.component";
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";
import {FicheMedicaleComponent} from "./components/fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "./components/dossiers-medicaux/dossiers-medicaux.component";
import {DossiersRoutingModule} from "./dossiers-routing.module";


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
