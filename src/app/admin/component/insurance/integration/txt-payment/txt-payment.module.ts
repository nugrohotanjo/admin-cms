import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';

// Lazy Load routing
import { TxtPaymentRoutingModule }                   from "./txt-payment-routing.module";

// Component
import { TxtPaymentComponent }                       from "./txt-payment.component";

import { BsDatepickerModule }                 from 'ngx-bootstrap/datepicker'

@NgModule({
  imports: [
    CommonModule,
    TxtPaymentRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    TxtPaymentComponent
  ]
})
export class TxtPaymentModule {}