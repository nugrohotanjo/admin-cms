import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ModalFactorRoutingModule }                 from "./modal-factor-routing.module";

// Component
import { ModalFactorManagementComponent }       from "./modal-factor-management.component";

import { InputTextareaModule }                  from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    ModalFactorRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ModalFactorManagementComponent
  ]
})
export class ModalFactorModule {}