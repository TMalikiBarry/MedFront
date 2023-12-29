import {NgModule} from '@angular/core';

import {OrganisationRoutingModule} from './organisation-routing.module';
import {SharedModule} from "../shared/shared.module";
import {CliniqueComponent} from './components/clinique/clinique.component';
import {PoleComponent} from './components/pole/pole.component';
import {ServiceComponent} from './components/service/service.component';


@NgModule({
  declarations: [
    CliniqueComponent,
    PoleComponent,
    ServiceComponent
  ],
  imports: [
    SharedModule,
    OrganisationRoutingModule
  ]
})
export class OrganisationModule { }
