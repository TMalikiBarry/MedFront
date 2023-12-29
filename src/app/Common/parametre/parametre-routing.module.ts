import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParametresComponent} from "./components/parametres/parametres.component";
import {LogActionComponent} from "./components/log-action/log-action.component";
import {SessionComponent} from "./components/session/session.component";

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
