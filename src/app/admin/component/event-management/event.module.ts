import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { EventRoutingModule }                   from "./event-routing.module";

// Component
import { EventManagementComponent }             from "./event-management.component";
import { EventEditComponent }                   from './event-edit.component';
import { EventAddComponent }                    from './event-add.component';

import { InputTextareaModule }                  from 'primeng/inputtextarea'

import { NgxEditorModule }                      from 'ngx-editor';
import { TooltipModule }                        from 'ngx-bootstrap/tooltip';


@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    NgxEditorModule,
    TooltipModule,
    HttpClientModule
  ],
  declarations: [
    EventManagementComponent,
    EventAddComponent,
    EventEditComponent
  ]
})
export class EventModule {}