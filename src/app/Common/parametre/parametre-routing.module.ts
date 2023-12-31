import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParametresComponent} from "./components/parametres/parametres.component";
import {LogActionComponent} from "./components/log-action/log-action.component";
import {SessionComponent} from "./components/session/session.component";
import {authGuard} from "../../guards/auth.guard";

const routes: Routes = [
  { path: 'parametres', component: ParametresComponent, canActivate: [authGuard] },
  { path: 'log-actions', component: LogActionComponent, canActivate: [authGuard] },
  { path: 'sessions', component: SessionComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametreRoutingModule { }
