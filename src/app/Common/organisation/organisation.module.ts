import {NgModule} from '@angular/core';

import {OrganisationRoutingModule} from './organisation-routing.module';
import {SharedModule} from "../shared/shared.module";
import {CliniqueComponent} from './components/clinique/clinique.component';
import {PoleComponent} from './components/pole/pole.component';
import {ServiceComponent} from './components/service/service.component';
import {PersonnelComponent} from "./components/personnel/personnel.component";
import {CliniqueFormDialogComponent} from './dialogs/clinique-form-dialog/clinique-form-dialog.component';
import {PoleFormDialogComponent} from './dialogs/pole-form-dialog/pole-form-dialog.component';
import {ServiceFormDialogComponent} from './dialogs/service-form-dialog/service-form-dialog.component';
import {PersonnelFormDialogComponent} from './dialogs/personnel-form-dialog/personnel-form-dialog.component';


@NgModule({
  declarations: [
    CliniqueComponent,
    PoleComponent,
    ServiceComponent,
    PersonnelComponent,
    CliniqueFormDialogComponent,
    PoleFormDialogComponent,
    ServiceFormDialogComponent,
    PersonnelFormDialogComponent
  ],
  imports: [
    SharedModule,
    OrganisationRoutingModule
  ]
})
export class OrganisationModule { }
