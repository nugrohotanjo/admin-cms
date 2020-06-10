import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { EventCategoryRoutingModule }           from "./event-category-routing.module";

// Component
import { EventCategoryManagementComponent }     from "./event-category-management.component";
  
import { InputTextareaModule }                  from 'primeng/inputtextarea';

import { EventCategoryAddComponent }            from './event-category-add.component';
import { EventCategoryEditComponent }           from './event-category-edit.component';


@NgModule({
  imports: [
    CommonModule,
    EventCategoryRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EventCategoryManagementComponent,
    EventCategoryAddComponent,
    EventCategoryEditComponent
  ]
})
export class EventCategoryModule {}