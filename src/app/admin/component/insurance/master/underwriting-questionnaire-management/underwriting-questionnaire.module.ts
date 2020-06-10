import { NgModule }                                         from "@angular/core";
import { CommonModule }                                     from '@angular/common';
import { HttpClientModule }                                 from '@angular/common/http';
import { ReactiveFormsModule }                              from '@angular/forms';

// Lazy Load routing
import { UnderwritingQuestionnaireRoutingModule }           from "./underwriting-questionnaire-routing.module";

// Component
import { UnderwritingQuestionnaireManagementComponent }     from "./underwriting-questionnaire-management.component";

import { InputTextareaModule }                              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    UnderwritingQuestionnaireRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    UnderwritingQuestionnaireManagementComponent
  ]
})
export class UnderwritingQuestionnaireModule {}