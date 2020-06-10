import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { TransactionRoutingModule }             from "./transaction-routing.module";

// Component
import { TransactionComponent }                 from "./transaction.component";
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';


@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    TransactionComponent,
    TransactionDetailComponent
  ]
})
export class TransactionModule {}