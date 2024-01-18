import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParametresComponent} from "./components/parametres/parametres.component";
import {LogActionComponent} from "./components/log-action/log-action.component";
import {SessionComponent} from "./components/session/session.component";
import {authGuard} from "../../guards/auth.guard";
import {CliniqueComponent} from "./components/clinique/clinique.component";
import {PoleComponent} from "./components/pole/pole.component";
import {ServiceComponent} from "./components/service/service.component";
import {PersonnelComponent} from "../personnes/components/personnel/personnel.component";

const routes: Routes = [
  { path: 'cliniques', component: CliniqueComponent, canActivate: [authGuard] },
  { path: 'poles', component: PoleComponent, canActivate: [authGuard] },
  { path: 'services', component: ServiceComponent, canActivate: [authGuard] },
  { path: 'personnels', component: PersonnelComponent, canActivate: [authGuard]},
  { path: 'parametres', component: ParametresComponent, canActivate: [authGuard] },
  { path: 'log-actions', component: LogActionComponent, canActivate: [authGuard] },
  { path: 'sessions', component: SessionComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametreRoutingModule { }
