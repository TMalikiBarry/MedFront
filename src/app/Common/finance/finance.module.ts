import {NgModule} from '@angular/core';

import {FinanceRoutingModule} from './finance-routing.module';
import {SharedModule} from "../shared/shared.module";
import {TransactionsComponent} from './components/transactions/transactions.component';
import {NewPaymentFormDialogComponent} from './dialogs/new-payment-form-dialog/new-payment-form-dialog.component';
import {DetailFactureComponent} from './components/detail-facture/detail-facture.component';


@NgModule({
  declarations: [
    TransactionsComponent,
    NewPaymentFormDialogComponent,
    DetailFactureComponent
  ],
  imports: [
    SharedModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
