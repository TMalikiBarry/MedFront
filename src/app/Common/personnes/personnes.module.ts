import {NgModule} from '@angular/core';

import {PersonnesRoutingModule} from './personnes-routing.module';
import {SharedModule} from "../shared/shared.module";
import {PatientComponent} from './components/patient/patient.component';
import {FicheMedicaleComponent} from "./components/fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "./components/dossiers-medicaux/dossiers-medicaux.component";
import {NouveauPatientComponent} from './dialogs/nouveau-patient-form-dialog/nouveau-patient.component';
import {OnePatientPageComponent} from './components/one-patient-page/one-patient-page.component';
import {NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [
    PatientComponent,
    FicheMedicaleComponent,
    DossiersMedicauxComponent,
    NouveauPatientComponent,
    OnePatientPageComponent,
  ],
  imports: [
    SharedModule,
    PersonnesRoutingModule,
    NgOptimizedImage,
  ]
})
export class PersonnesModule { }
