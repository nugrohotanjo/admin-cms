import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';

// Lazy Load routing
import { DashboardRoutingModule }           from "./dashboard-routing.module";

// Component
import { DashboardComponent }               from "./dashboard.component";

// Chart js
import { ChartModule } from 'angular2-chartjs';

import { EpolicyDeliveryService } from '../reports/epolicy-delivery/epolicy-delivery.service'

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule
  ],
  declarations: [DashboardComponent],
  providers: [
    EpolicyDeliveryService
  ]
})
export class DashboardModule {}