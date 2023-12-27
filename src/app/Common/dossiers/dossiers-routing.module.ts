import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RendezVousComponent} from "./rendez-vous/rendez-vous.component";
import {PrestationComponent} from "./prestation/prestation.component";
import {FicheMedicaleComponent} from "./fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "./dossiers-medicaux/dossiers-medicaux.component";

const routes: Routes = [
  {path: 'rendez-vous', component: RendezVousComponent},
  {path: 'prestation', component: PrestationComponent},
  {path: 'fiche-medicale', component: FicheMedicaleComponent},
  {path: 'dossiers-medicaux', component: DossiersMedicauxComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossiersRoutingModule { }
