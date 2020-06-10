import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { MasterSetupRateRoutingModule }                 from "./master-setup-rate-routing.module";

// Component
import { MasterSetupRateComponent }       from "./master-setup-rate.component";

@NgModule({
  imports: [
    CommonModule,
    MasterSetupRateRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    MasterSetupRateComponent
    
  ]
})
export class MasterSetupRateModule {}