import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParametresComponent} from "./parametres/parametres.component";
import {LogActionComponent} from "./log-action/log-action.component";
import {SessionComponent} from "./session/session.component";

const routes: Routes = [
  { path: 'parametres', component: ParametresComponent},
  { path: 'log-actions', component: LogActionComponent},
  { path: 'sessions', component: SessionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametreRoutingModule { }
