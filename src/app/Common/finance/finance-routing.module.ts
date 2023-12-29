import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionsComponent} from "./components/transactions/transactions.component";

const routes: Routes = [
  { path: 'transactions', component:TransactionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
