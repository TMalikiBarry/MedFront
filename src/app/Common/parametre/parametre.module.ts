import {NgModule} from '@angular/core';

import {ParametreRoutingModule} from './parametre-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ParametresComponent} from './parametres/parametres.component';
import {LogActionComponent} from './log-action/log-action.component';
import {SessionComponent} from './session/session.component';


@NgModule({
  declarations: [
    ParametresComponent,
    LogActionComponent,
    SessionComponent
  ],
  imports: [
    SharedModule,
    ParametreRoutingModule
  ]
})
export class ParametreModule { }
