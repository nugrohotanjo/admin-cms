import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { BankRoutingModule }                 from "./bank-routing.module";

// Component
import { BankComponent }           from "./bank.component";

import { InputTextareaModule }              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    BankRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    BankComponent
  ]
})
export class BankModule {}