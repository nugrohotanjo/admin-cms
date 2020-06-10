import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { SettingRoutingModule }                 from "./setting-routing.module";

// Component
import { SettingManagementComponent }          from "./setting-management.component"

// Library
import { InputTextareaModule }              from 'primeng/inputtextarea';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    SettingManagementComponent
  ]
})
export class SettingModule {}