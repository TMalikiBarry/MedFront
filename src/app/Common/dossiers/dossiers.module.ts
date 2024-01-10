import {NgModule} from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import {PrestationComponent} from "./components/prestation/prestation.component";
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";
import {DossiersRoutingModule} from "./dossiers-routing.module";
import { PrestationFormDialogComponent } from './dialogs/prestation-form-dialog/prestation-form-dialog.component';
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import { RendezVousFormDialogComponent } from './dialogs/rendez-vous-form-dialog/rendez-vous-form-dialog.component';
import { DetailRendezVousComponent } from './dialogs/detail-rendez-vous/detail-rendez-vous.component';


@NgModule({
  declarations: [
    PrestationComponent,
    RendezVousComponent,
    PrestationFormDialogComponent,
    RendezVousFormDialogComponent,
    DetailRendezVousComponent
  ],
  imports: [
    SharedModule,
    DossiersRoutingModule,
    NzCalendarModule,
    NzBadgeModule,
  ]
})
export class DossiersModule { }
