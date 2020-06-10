import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule , FormsModule }from '@angular/forms';

// Lazy Load routing
import { UserRoutingModule }                from "./user-routing.module";

// Component
import { UserManagementComponent }          from './user-management.component';
import { UserAddComponent }                 from './user-add.component';
import { UserEditComponent }                from './user-edit.component';

import { MultiSelectModule }                from 'primeng/multiselect';
import { TableModule }                      from 'primeng/table';
import { InputTextareaModule }              from 'primeng/inputtextarea';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    InputTextareaModule,
    MultiSelectModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserManagementComponent,
    UserAddComponent,
    UserEditComponent]
})
export class UserModule {}