import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { HealthProductSetupRoutingModule }      from "./health-product-setup-routing.module";

// Component
import { HealthProductSetupComponent }          from "./health-product-setup.component";

@NgModule({
  imports: [
    CommonModule,
    HealthProductSetupRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    HealthProductSetupComponent
  ]
})
export class HealthProductSetupModule {}