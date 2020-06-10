import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { CampaignRoutingModule }             from "./campaign-routing.module";

// Component
import { CampaignManagementComponent }        from "./campaign-management.component";
  
import { MultiSelectModule }                  from 'primeng/multiselect';
import { TableModule }                        from 'primeng/table';
import { InputTextareaModule }                from 'primeng/inputtextarea';
import { CalendarModule }                     from 'primeng/calendar';

import { NgbModule }                          from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule }                 from 'ngx-bootstrap/datepicker'
import { MomentModule }                       from 'ngx-moment'

@NgModule({
  imports: [
    CommonModule,
    CampaignRoutingModule,
    InputTextareaModule,
    MultiSelectModule,
    TableModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    MomentModule.forRoot()
  ],
  declarations: [
    CampaignManagementComponent
  ]
})
export class CampaignModule {}