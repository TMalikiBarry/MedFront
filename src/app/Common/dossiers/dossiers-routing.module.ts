import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";
import {PrestationComponent} from "./components/prestation/prestation.component";
import {FicheMedicaleComponent} from "./components/fiche-medicale/fiche-medicale.component";
import {DossiersMedicauxComponent} from "./components/dossiers-medicaux/dossiers-medicaux.component";
import {authGuard} from "../../guards/auth.guard";


const routes: Routes = [
  {path: 'rendez-vous', component: RendezVousComponent, canActivate: [authGuard]},
  {path: 'prestation', component: PrestationComponent, canActivate: [authGuard]},
  {path: 'fiche-medicale', component: FicheMedicaleComponent, canActivate: [authGuard]},
  {path: 'dossiers-medicaux', component: DossiersMedicauxComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossiersRoutingModule { }
