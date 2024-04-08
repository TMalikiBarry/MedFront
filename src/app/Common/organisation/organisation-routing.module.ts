import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CliniqueComponent} from "./components/clinique/clinique.component";
import {PoleComponent} from "./components/pole/pole.component";
import {ServiceComponent} from "./components/service/service.component";
import {authGuard} from "../../guards/auth.guard";
import {PersonnelComponent} from "./components/personnel/personnel.component";

const routes: Routes = [
  {path: 'cliniques', component: CliniqueComponent, canActivate: [authGuard]},
  {path: 'poles', component: PoleComponent, canActivate: [authGuard]},
  {path: 'services', component: ServiceComponent, canActivate: [authGuard]},
  {path: 'personnels', component: PersonnelComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
