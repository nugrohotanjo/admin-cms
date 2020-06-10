import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsBenefitRoutingModule }                   from "./cms-benefit-routing.module";

// Component
import { CmsBenefitComponent }                       from "./cms-benefit.component";

@NgModule({
  imports: [
    CommonModule,
    CmsBenefitRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsBenefitComponent
  ]
})
export class CmsBenefitModule {}