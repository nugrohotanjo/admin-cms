import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CurrencyRoutingModule }                 from "./currency-routing.module";

// Component
import { CurrencyComponent }           from "./currency.component";

import { InputTextareaModule }              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CurrencyComponent
  ]
})
export class CurrencyModule {}