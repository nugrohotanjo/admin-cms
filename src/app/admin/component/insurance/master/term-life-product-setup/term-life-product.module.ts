import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { TermLifeProductSetupRoutingModule }      from "./term-life-product-routing.module";

// Component
import { TermLifeProductSetupComponent }          from "./term-life-product-setup.component";

@NgModule({
  imports: [
    CommonModule,
    TermLifeProductSetupRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    TermLifeProductSetupComponent
  ]
})
export class TermLifeProductSetupModule {}