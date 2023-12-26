import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuriteRoutingModule } from './securite-routing.module';
import {AccesComponent} from "./acces/acces.component";
import {ProfilComponent} from "./profil/profil.component";



@NgModule({
  declarations: [
    AccesComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    SecuriteRoutingModule
  ]
})
export class SecuriteModule { }
