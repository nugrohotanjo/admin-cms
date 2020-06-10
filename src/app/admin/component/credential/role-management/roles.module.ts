import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { RolesRoutingModule }             from "./roles-routing.module";

// Component
import { RoleManagementComponent }          from "./role-management.component";
import { RoleAddComponent }                 from './role-add.component';
import { RoleEditComponent }                from './role-edit.component';

import { MultiSelectModule }                from 'primeng/multiselect';
import { TableModule }                      from 'primeng/table';
import { InputTextareaModule }              from 'primeng/inputtextarea';

// Slug
import { SlugifyPipe }                      from '../../../shared/pipe/slugify.pipe';


@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    InputTextareaModule,
    MultiSelectModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    RoleManagementComponent,
    RoleAddComponent,
    RoleEditComponent,
    SlugifyPipe
  ]
})
export class RolesModule {}