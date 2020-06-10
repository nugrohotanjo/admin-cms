import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { SchedulerRoutingModule }                 from "./scheduler-routing.module";

// Component
import { SchedulerComponent }           from "./scheduler.component";

// Library
import { InputTextareaModule }              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextareaModule,
  ],
  declarations: [
    SchedulerComponent
  ]
})
export class SchedulerModule {}