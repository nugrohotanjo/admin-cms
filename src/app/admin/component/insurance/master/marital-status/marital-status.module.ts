import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { MaritalStatusRoutingModule }           from "./marital-status-routing.module";

// Component
import { MaritalStatusComponent }               from "./marital-status.component";

@NgModule({
  imports: [
    CommonModule,
    MaritalStatusRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    MaritalStatusComponent
  ]
})
export class MaritalStatusModule {}