import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from "./components/patient/patient.component";
import {authGuard} from "../../guards/auth.guard";
import {FicheMedicaleComponent} from "./components/fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "./components/dossiers-medicaux/dossiers-medicaux.component";

const routes: Routes = [
  { path: 'patients', component: PatientComponent, canActivate: [authGuard]},
  {path: 'fiche-medicale', component: FicheMedicaleComponent, canActivate: [authGuard]},
  {path: 'dossiers-medicaux', component: DossiersMedicauxComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnesRoutingModule { }
