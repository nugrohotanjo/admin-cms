import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';

// Lazy Load routing
import { IntegrationPolicyMasterRoutingModule }                   from "./integration-policy-master-routing.module";

// Component
import { IntegrationPolicyMasterComponent }                       from "./integration-policy-master.component";

import { BsDatepickerModule }                 from 'ngx-bootstrap/datepicker'

@NgModule({
  imports: [
    CommonModule,
    IntegrationPolicyMasterRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    IntegrationPolicyMasterComponent
  ]
})
export class IntegrationPolicyMasterModule {}