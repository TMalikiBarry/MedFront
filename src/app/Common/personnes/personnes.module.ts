import {NgModule} from '@angular/core';

import {PersonnesRoutingModule} from './personnes-routing.module';
import {SharedModule} from "../shared/shared.module";
import {PatientComponent} from './components/patient/patient.component';
import {FicheMedicaleComponent} from "./components/fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "./components/dossiers-medicaux/dossiers-medicaux.component";
import { NouveauPatientComponent } from './components/nouveau-patient/nouveau-patient.component';


@NgModule({
  declarations: [
    PatientComponent,
    FicheMedicaleComponent,
    DossiersMedicauxComponent,
    NouveauPatientComponent,
  ],
  imports: [
    SharedModule,
    PersonnesRoutingModule
  ]
})
export class PersonnesModule { }
