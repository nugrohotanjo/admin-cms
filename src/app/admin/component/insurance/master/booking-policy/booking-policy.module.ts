import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { BookingPolicyRoutingModule }             from "./booking-policy-routing.module";

// Component
import { BookingPolicyComponent }           from "./booking-policy.component";


@NgModule({
  imports: [
    CommonModule,
    BookingPolicyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    BookingPolicyComponent
  ]
})
export class BookingPolicyModule {}