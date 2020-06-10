import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { MasterFormulaRoutingModule }                from "./master-formula-routing.module";

// Component
import { MasterFormulaComponent }        from "./master-formula.component";

import { NgbModule }                          from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    MasterFormulaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    MasterFormulaComponent
  ]
})
export class MasterFormulaModule {}