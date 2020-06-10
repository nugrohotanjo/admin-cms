import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsClaimRoutingModule }                   from "./cms-claim-routing.module";

// Component
import { CmsClaimComponent }                       from "./cms-claim.component";

@NgModule({
  imports: [
    CommonModule,
    CmsClaimRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsClaimComponent
  ]
})
export class CmsClaimModule {}