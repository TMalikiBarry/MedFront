import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzBadgeModule} from "ng-zorro-antd/badge";


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBreadCrumbModule,
    NzModalModule,
    FormsModule,
    NzDatePickerModule,
    NzSelectModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzCalendarModule,
    NzBadgeModule,
  ],
  imports: []
})
export class SharedModule {
}
