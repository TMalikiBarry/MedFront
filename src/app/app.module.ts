import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthentificationComponent} from './authentification/authentification.component';
import {fr_FR, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import fr from '@angular/common/locales/fr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {GeneralHttpInterceptor} from "./interceptors/general-http.interceptor";
import {AdminLayoutModule} from './Common/admin-layout/admin-layout.module';

registerLocaleData(fr);


@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    AdminLayoutModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: fr_FR},
    {provide: HTTP_INTERCEPTORS, useClass: GeneralHttpInterceptor, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
