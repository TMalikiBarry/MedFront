import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CliniqueComponent} from "../parametre/components/clinique/clinique.component";
import {PoleComponent} from "../parametre/components/pole/pole.component";
import {ServiceComponent} from "../parametre/components/service/service.component";
import {authGuard} from "../../guards/auth.guard";

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
