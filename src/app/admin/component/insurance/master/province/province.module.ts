import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ProvinceRoutingModule }                 from "./province-routing.module";

// Component
import { ProvinceComponent }           from "./province.component";

@NgModule({
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ProvinceComponent
  ]
})
export class BenefitModule {}