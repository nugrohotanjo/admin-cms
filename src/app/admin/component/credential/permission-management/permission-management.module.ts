import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule , FormsModule }from '@angular/forms';

// Lazy Load routing
import { PermissionRoutingModule }                from "./permission-management-routing.module";

// Component
import { PermissionManagementComponent }          from './permission-management.component';

import { InputTextareaModule }              from 'primeng/inputtextarea';


@NgModule({
  imports: [
    CommonModule,
    PermissionRoutingModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PermissionManagementComponent
]
})
export class PermissionModule {}