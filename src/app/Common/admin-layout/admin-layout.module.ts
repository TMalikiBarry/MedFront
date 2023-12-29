import {NgModule} from '@angular/core';


import {AdminLayoutRoutingModule} from './admin-layout-routing.module';
import {CommonNavbarComponent} from "./common-navbar/common-navbar.component";
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    CommonNavbarComponent,
    DashboardComponent
  ],
  imports: [
    AdminLayoutRoutingModule,
    SharedModule,
  ]
})
export class AdminLayoutModule { }
