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
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {DisplayNonNullStringPipe} from "../../pipes/display-string/display-non-null-string.pipe";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {PrettyPhoneNumberPipe} from "../../pipes/pretty-phone-number/pretty-phone-number.pipe";
import {TimeAgoPipe} from "../../pipes/TimeAgo/time-ago.pipe";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {AppPositiveNumberDirective} from "../../directives/appPositiveNumber/app-positive-number.directive";
import {FormatAgePipe} from '../../pipes/format-age/format-age.pipe';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {FormatNamePipe} from "../../pipes/format-name/format-name.pipe";
import {FormatFileSizePipe} from "../../pipes/format-file-size/format-file-size.pipe";
import {SafeResourceUrlPipe} from "../../pipes/safe-resource-url/safe-resource-url.pipe";


@NgModule({
  declarations: [
    DisplayNonNullStringPipe,
    TimeAgoPipe,
    AppPositiveNumberDirective,
    FormatAgePipe,

  ],
  exports: [
    CommonModule,
    DisplayNonNullStringPipe,
    TimeAgoPipe,
    PrettyPhoneNumberPipe,
    FormatAgePipe,
    FormatNamePipe,
    FormatFileSizePipe,
    SafeResourceUrlPipe,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzCollapseModule,
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
    NzInputNumberModule,
    NzToolTipModule,
    NzMessageModule,
    ReactiveFormsModule,
    NzSliderModule,
    NzButtonModule,
    NzTableModule,
    NzCalendarModule,
    NzBadgeModule,
    NzDividerModule,
    NzPaginationModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NzRadioModule,
    AppPositiveNumberDirective
  ],
  // Pour StandAlone Pipe
  imports: [
    PrettyPhoneNumberPipe,
    FormatNamePipe,
    FormatFileSizePipe,
    SafeResourceUrlPipe,

  ]
})
export class SharedModule {
}
