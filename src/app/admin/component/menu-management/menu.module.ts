import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { MenuRoutingModule }                    from "./menu-routing.module";

// Component
import { MenuManagementComponent }              from "./menu-management.component";

import { MenuAddComponent }                     from './menu-add.component'
import { MenuEditComponent }                    from './menu-edit.component'


@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    MenuManagementComponent,
    MenuAddComponent,
    MenuEditComponent,
  ]
})
export class MenuModule {}