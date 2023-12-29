import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CliniqueComponent} from "./clinique/clinique.component";
import {PoleComponent} from "./pole/pole.component";
import {ServiceComponent} from "./service/service.component";

const routes: Routes = [
  { path: 'cliniques', component: CliniqueComponent},
  { path: 'poles', component: PoleComponent},
  { path: 'services', component: ServiceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
