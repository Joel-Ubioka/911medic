import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
    // future: bookings, profile, availability, etc.
  ],
  imports: [
    CommonModule,
    SharedModule,
    SpecialistRoutingModule
  ]
})
export class SpecialistModule { }
