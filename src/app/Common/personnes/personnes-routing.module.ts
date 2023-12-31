import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from "./components/patient/patient.component";
import {PersonnelComponent} from "./components/personnel/personnel.component";
import {authGuard} from "../../guards/auth.guard";

const routes: Routes = [
  { path: 'patients', component: PatientComponent, canActivate: [authGuard]},
  { path: 'personnels', component: PersonnelComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnesRoutingModule { }
