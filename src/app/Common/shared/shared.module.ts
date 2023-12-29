import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
  ],
  imports: []
})
export class SharedModule { }
