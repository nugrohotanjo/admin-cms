import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { CtaRoutingModule }          from "./cta-routing.module";

// Component
import { CtaComponent }               from "./cta.component";
import { CtaDetailComponent }         from './cta-detail/cta-detail.component';

// Module
import { BsDatepickerModule }                from 'ngx-bootstrap/datepicker'

import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    CtaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    CtaComponent,
    CtaDetailComponent
  ]
})
export class CtaModule {}