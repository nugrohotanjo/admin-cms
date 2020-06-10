import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { PaymentMethodRoutingModule }           from "./payment-method-routing.module";

// Component
import { PaymentMethodManagementComponent }      from "./payment-method-management.component";

@NgModule({
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    PaymentMethodManagementComponent
  ]
})
export class PaymentMethodModule {}