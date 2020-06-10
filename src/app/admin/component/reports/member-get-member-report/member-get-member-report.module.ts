import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { MemberGetMemberReportingRoutingModule }             from "./member-get-member-report-routing.module";

// Component
import { MemberGetMemberReportComponent }           from "./member-get-member-report.component";
import { MemberGetMemberDetailComponent } from './member-get-member-detail/member-get-member-detail.component';

import { NgbModule, NgbDateParserFormatter }                          from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule }                 from 'ngx-bootstrap/datepicker'
import { NgbDateIDParserFormatter} from '../../../shared/helper/ngb-date-id-parser-formatter'

@NgModule({
  imports: [
    CommonModule,
    MemberGetMemberReportingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    MemberGetMemberReportComponent,
    MemberGetMemberDetailComponent
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateIDParserFormatter }
  ],
})
export class MemberGetMemberReportModule {}