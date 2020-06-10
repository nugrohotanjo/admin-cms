import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { JobClassMappingRoutingModule }                 from "./job-class-mapping-routing.module";

// component
import { JobClassMappingComponent } from './job-class-mapping.component';
import { JobClassMappingDetailComponent } from './job-class-mapping-detail/job-class-mapping-detail.component'

import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    JobClassMappingRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule
  ],
  declarations: [
    JobClassMappingComponent,
    JobClassMappingDetailComponent
  ]
})
export class JobClassMappingModule {}