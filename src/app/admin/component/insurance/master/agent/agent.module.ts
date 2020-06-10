import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { AgentRoutingModule }                   from "./agent-routing.module";

// Component
import { AgentComponent }                       from "./agent.component";


@NgModule({
  imports: [
    CommonModule,
    AgentRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AgentComponent
  ]
})
export class AgentModule {}