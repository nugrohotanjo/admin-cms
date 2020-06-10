import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ApiConsumerRoutingModule }                   from "./api-consumer-routing.module";

// Component
import { ApiConsumerComponent }                       from "./api-consumer.component";

import { ApiConsumerDetailComponent } from './api-consumer-detail/api-consumer-detail.component';


@NgModule({
  imports: [
    CommonModule,
    ApiConsumerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ApiConsumerComponent,
    ApiConsumerDetailComponent
  ]
})
export class ApiConsumerModule {}