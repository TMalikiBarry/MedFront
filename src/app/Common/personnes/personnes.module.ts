import {NgModule} from '@angular/core';

import {PersonnesRoutingModule} from './personnes-routing.module';
import {SharedModule} from "../shared/shared.module";
import {PersonnelComponent} from './personnel/personnel.component';
import {PatientComponent} from './patient/patient.component';


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
