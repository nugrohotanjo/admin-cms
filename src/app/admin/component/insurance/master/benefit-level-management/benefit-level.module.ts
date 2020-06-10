import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { BenefitLevelRoutingModule }            from "./benefit-level-routing.module";

// Component
import { BenefitLevelManagementComponent }      from "./benefit-level-management.component";

@NgModule({
  imports: [
    CommonModule,
    BenefitLevelRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    BenefitLevelManagementComponent
  ]
})
export class BenefitLevelModule {}