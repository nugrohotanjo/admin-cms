import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { VisitorRoutingModule }                    from "./visitor-routing.module";

// Component
import { VisitorComponent }               from "./visitor.component";
import { VisitorDetailComponent }         from './visitor-detail/visitor-detail.component';

@NgModule({
  imports: [
    CommonModule,
    VisitorRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    VisitorComponent,
    VisitorDetailComponent
  ]
})
export class VisitorModule {}