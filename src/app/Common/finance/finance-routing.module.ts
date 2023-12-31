import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {authGuard} from "../../guards/auth.guard";

const routes: Routes = [
  { path: 'transactions', component:TransactionsComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
