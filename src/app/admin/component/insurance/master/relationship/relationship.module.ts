import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { RelationshipRoutingModule }                 from "./relationship-routing.module";

// Component
import { RelationshipComponent }           from "./relationship.component";

import { InputTextareaModule }              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    RelationshipRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    RelationshipComponent
  ]
})
export class RelationshipModule {}