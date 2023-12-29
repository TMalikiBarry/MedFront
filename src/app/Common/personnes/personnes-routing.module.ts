import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from "./patient/patient.component";
import {PersonnelComponent} from "./personnel/personnel.component";

const routes: Routes = [
  { path: 'patients', component: PatientComponent },
  { path: 'personnels', component: PersonnelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnesRoutingModule { }
