import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { RenewRechargeRoutingModule }                 from "./renew-recharge-routing.module";

// Component
import { RenewalRechargeComponent }           from "./renewal-recharge.component";

// Library
import { InputTextareaModule }              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    RenewRechargeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextareaModule,
  ],
  declarations: [
    RenewalRechargeComponent
  ]
})
export class RenewRechargeModule {}