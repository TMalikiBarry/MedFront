import {NgModule} from '@angular/core';

import {ParametreRoutingModule} from './parametre-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ParametresComponent} from './components/parametres/parametres.component';
import {LogActionComponent} from './components/log-action/log-action.component';
import {SessionComponent} from './components/session/session.component';


@NgModule({
  declarations: [
    ParametresComponent,
    LogActionComponent,
    SessionComponent,
  ],
  imports: [
    SharedModule,
    ParametreRoutingModule
  ]
})
export class ParametreModule { }
