import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { PolicyRoutingModule }                 from "./policy-routing.module";

// Component
import { PolicyManagementComponent }            from "./policy-management.component";

@NgModule({
  imports: [
    CommonModule,
    PolicyRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    PolicyManagementComponent
  ]
})
export class PolicyModule {}