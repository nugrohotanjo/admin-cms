import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { CampaignSalesRoutingModule }             from "./campaign-sales-routing.module";

// Component
import { CampaignSalesManagementComponent }        from "./campaign-sales.component";

import { InputTextareaModule }                from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    CampaignSalesRoutingModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CampaignSalesManagementComponent
  ]
})
export class CampaignSalesModule {}