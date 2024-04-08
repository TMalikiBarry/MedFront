import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {authGuard} from "../../guards/auth.guard";
import {PaymentSuccessComponent} from "./dialogs/payment-success/payment-success.component";
import {PaymentFailedComponent} from "./dialogs/payment-failed/payment-failed.component";
import {DetailFactureComponent} from "./components/detail-facture/detail-facture.component";

const routes: Routes = [
  {
    path: 'transactions',
    component:TransactionsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'transactions/:id',
    component: DetailFactureComponent,
    canActivate: [authGuard]
  },
  {
    path : 'paymentsuccess',
    component : PaymentSuccessComponent,
  },
  {
    path : 'paymentfailed',
    component : PaymentFailedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
