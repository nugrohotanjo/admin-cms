import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { EmailPicRoutingModule }                   from "./emailpic-routing.module";

// Component
import { EmailpicComponent }                       from "./emailpic.component";

@NgModule({
  imports: [
    CommonModule,
    EmailPicRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    EmailpicComponent
  ]
})
export class EmailpicModule {}