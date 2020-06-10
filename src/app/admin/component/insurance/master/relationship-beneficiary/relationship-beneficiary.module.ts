import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { RelationshipBeneficiaryRoutingModule }                 from "./relationship-beneficiary-routing.module";

// Component
import { RelationshipBeneficiaryComponent }           from "./relationship-beneficiary.component";

@NgModule({
  imports: [
    CommonModule,
    RelationshipBeneficiaryRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    RelationshipBeneficiaryComponent
  ]
})
export class RelationshipBeneficiaryModule {}