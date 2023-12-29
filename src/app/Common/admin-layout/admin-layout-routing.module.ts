import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dossiers',
    loadChildren: () => import('../dossiers/dossiers.module').then(m => m.DossiersModule)
  },
  {
    path: 'organisation',
    loadChildren: () => import('../organisation/organisation.module').then(m => m.OrganisationModule)
  },
  {
    path: 'personnes',
    loadChildren: () => import('../personnes/personnes.module').then(m => m.PersonnesModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('../finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: 'securite',
    loadChildren: () => import('../securite/securite.module').then(m => m.SecuriteModule)
  },
  {
    path: 'parametre',
    loadChildren: () => import('../parametre/parametre.module').then(m => m.ParametreModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
