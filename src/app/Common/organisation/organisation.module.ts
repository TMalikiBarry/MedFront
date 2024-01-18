import {NgModule} from '@angular/core';

import {OrganisationRoutingModule} from './organisation-routing.module';
import {SharedModule} from "../shared/shared.module";
import {CliniqueComponent} from '../parametre/components/clinique/clinique.component';
import {PoleComponent} from '../parametre/components/pole/pole.component';
import {ServiceComponent} from '../parametre/components/service/service.component';


@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    OrganisationRoutingModule
  ]
})
export class OrganisationModule { }
