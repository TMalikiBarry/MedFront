import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";
import {PrestationComponent} from "./components/prestation/prestation.component";
import {authGuard} from "../../guards/auth.guard";


const routes: Routes = [
  {path: 'rendez-vous', component: RendezVousComponent, canActivate: [authGuard]},
  {path: 'prestation', component: PrestationComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossiersRoutingModule { }
