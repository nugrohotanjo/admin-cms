import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { BenefitRoutingModule }                 from "./benefit-routing.module";

// Component
import { BenefitManagementComponent }           from "./benefit-management.component";

import { InputTextareaModule }              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    BenefitRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    BenefitManagementComponent
  ]
})
export class BenefitModule {}