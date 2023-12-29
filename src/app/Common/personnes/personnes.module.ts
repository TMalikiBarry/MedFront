import {NgModule} from '@angular/core';

import {PersonnesRoutingModule} from './personnes-routing.module';
import {SharedModule} from "../shared/shared.module";
import {PersonnelComponent} from './components/personnel/personnel.component';
import {PatientComponent} from './components/patient/patient.component';


@NgModule({
  declarations: [
    PersonnelComponent,
    PatientComponent
  ],
  imports: [
    SharedModule,
    PersonnesRoutingModule
  ]
})
export class PersonnesModule { }
