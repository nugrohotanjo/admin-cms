import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { LogRoutingModule }                     from "./log-routing.module";

// Component
import { LogManagementComponent }               from "./log-management.component";
import { LogDetailComponent }                   from './log-detail/log-detail.component'

// import { MomentModule }                         from 'ngx-moment';


@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    HttpClientModule,
    // MomentModule.forRoot()
  ],
  declarations: [
    LogManagementComponent,
    LogDetailComponent
  ]
})
export class LogModule {}