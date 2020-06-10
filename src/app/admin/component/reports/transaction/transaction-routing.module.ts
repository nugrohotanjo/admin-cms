import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { TransactionComponent }      from './transaction.component'
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component'

const routes: Routes = [
    { path: '',                             component: TransactionComponent},
    { path: 'detail/:id/:policy_number',    component: TransactionDetailComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class TransactionRoutingModule { }