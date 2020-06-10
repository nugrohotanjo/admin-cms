import { NgModule }                             from "@angular/core"
import { CommonModule }                         from '@angular/common'
import { HttpClientModule }                     from '@angular/common/http'
import { ReactiveFormsModule }                  from '@angular/forms'

// Lazy Load routing
import { MemberGetMemberRoutingModule }         from "./member-get-member-routing.module"

// Component
import { MemberGetMemberManagementComponent }   from "./member-get-member-management.component"
import { MemberGetMemberAddComponent }          from './member-get-member-add.component'
import { MemberGetMemberEditComponent }         from './member-get-member-edit.component'

// Pipe
import { MomentPipe } from '../../shared/pipe/moment.pipe';

// Package
import { ModalModule }                          from 'ngx-bootstrap/modal'
import { BsDatepickerModule }                   from 'ngx-bootstrap/datepicker'
// import { MomentModule }                         from 'ngx-moment'

@NgModule({
  imports: [
    CommonModule,
    MemberGetMemberRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // MomentModule
  ],
  declarations: [
    MomentPipe,
    MemberGetMemberManagementComponent,
    MemberGetMemberAddComponent,
    MemberGetMemberEditComponent,
  ]
})
export class MemberGetMemberModule {}