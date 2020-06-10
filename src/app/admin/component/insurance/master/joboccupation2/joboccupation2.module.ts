import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { JobOccupation2RoutingModule }                   from "./joboccupation2-routing.module";

// Component
import { Joboccupation2Component }                       from "./joboccupation2.component";

@NgModule({
  imports: [
    CommonModule,
    JobOccupation2RoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    Joboccupation2Component
  ]
})
export class JobOccupation2Module {}