import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ClaimRoutingModule }                   from "./claim-routing.module";

// Component
import { ClaimManagementComponent }                       from "./claim-management.component";
import { ClaimDetailComponent }                 from '../claim-detail/claim-detail.component'
import { BsDatepickerModule }                 from 'ngx-bootstrap/datepicker'

@NgModule({
  imports: [
    CommonModule,
    ClaimRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    ClaimManagementComponent,
    ClaimDetailComponent
  ]
})
export class ClaimModule {}