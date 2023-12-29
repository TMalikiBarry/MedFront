import {NgModule} from '@angular/core';

import {FinanceRoutingModule} from './finance-routing.module';
import {SharedModule} from "../shared/shared.module";
import {TransactionsComponent} from './components/transactions/transactions.component';


@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    SharedModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
