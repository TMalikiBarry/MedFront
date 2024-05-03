import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilFormDialogComponent} from "../securite/dialogs/profil-form-dialog/profil-form-dialog.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [ProfilFormDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SharedDialogsModule {
}
