import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { EpolicyDeliveryRoutingModule }          from "./epolicy-delivery-routing.module";

// Component
import { EpolicyDeliveryComponent }               from "./epolicy-delivery.component";

// Module
import { BsDatepickerModule }                from 'ngx-bootstrap/datepicker'

@NgModule({
  imports: [
    CommonModule,
    EpolicyDeliveryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    EpolicyDeliveryComponent
  ]
})
export class EpolicyDeliveryModule {}