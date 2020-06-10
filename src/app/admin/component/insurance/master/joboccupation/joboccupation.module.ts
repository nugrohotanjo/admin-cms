import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { JobOccupationRoutingModule }                   from "./joboccupation-routing.module";

// Component
import { JoboccupationComponent }                       from "./joboccupation.component";

@NgModule({
  imports: [
    CommonModule,
    JobOccupationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    JoboccupationComponent
  ]
})
export class JobOccupationModule {}