import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { FaqRoutingModule }                   from "./faq-routing.module";

// Component
import { FaqComponent }                       from "./faq.component";

// library
import { InputTextareaModule }              from 'primeng/inputtextarea';
import { NgxEditorModule }                      from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FaqRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextareaModule,
    NgxEditorModule
  ],
  declarations: [
    FaqComponent
  ]
})
export class FaqModule {}