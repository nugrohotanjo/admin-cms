import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { JobClassRoutingModule }                 from "./job-class-routing.module";

// component
import { JobClassComponent } from './job-class.component'

@NgModule({
  imports: [
    CommonModule,
    JobClassRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    JobClassComponent
  ]
})
export class JobClassModule {}