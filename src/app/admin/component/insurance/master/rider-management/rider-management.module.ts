import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { RiderManagementRoutingModule }      from "./rider-management-routing.module";

// Component
import { RiderManagementComponent }          from "./rider-management.component";

@NgModule({
  imports: [
    CommonModule,
    RiderManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    RiderManagementComponent
  ]
})
export class RiderManagementModule {}