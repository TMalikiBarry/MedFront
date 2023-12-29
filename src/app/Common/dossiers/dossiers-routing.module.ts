import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";
import {PrestationComponent} from "./components/prestation/prestation.component";
import {FicheMedicaleComponent} from "./components/fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "./components/dossiers-medicaux/dossiers-medicaux.component";


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
