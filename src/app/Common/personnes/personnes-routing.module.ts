import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from "./components/patient/patient.component";
import {PersonnelComponent} from "./components/personnel/personnel.component";

const routes: Routes = [
  { path: 'patients', component: PatientComponent },
  { path: 'personnels', component: PersonnelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnesRoutingModule { }
