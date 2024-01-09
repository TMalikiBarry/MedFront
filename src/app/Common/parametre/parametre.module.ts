import {NgModule} from '@angular/core';

import {ParametreRoutingModule} from './parametre-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ParametresComponent} from './components/parametres/parametres.component';
import {LogActionComponent} from './components/log-action/log-action.component';
import {SessionComponent} from './components/session/session.component';
import {CliniqueComponent} from "./components/clinique/clinique.component";
import {PoleComponent} from "./components/pole/pole.component";
import {ServiceComponent} from "./components/service/service.component";
import {PersonnelComponent} from "../personnes/components/personnel/personnel.component";


@NgModule({
  declarations: [
    ParametresComponent,
    LogActionComponent,
    SessionComponent,
    CliniqueComponent,
    PoleComponent,
    ServiceComponent,
    PersonnelComponent
  ],
  imports: [
    SharedModule,
    ParametreRoutingModule
  ]
})
export class ParametreModule { }
