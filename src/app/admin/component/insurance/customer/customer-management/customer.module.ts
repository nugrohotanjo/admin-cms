import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CustomerRoutingModule }                from "./customer-routing.module";

// Component
import { CustomerManagementComponent }          from "./customer-management.component";


@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CustomerManagementComponent
  ]
})
export class CustomerModule {}