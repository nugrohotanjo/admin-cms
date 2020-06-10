import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CityRoutingModule }                 from "./city-routing.module";

// Component
import { CityComponent }                        from "./city.component";

import { DataTablesModule }                     from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    CityRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CityComponent
  ]
})
export class CityModule {}