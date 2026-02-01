import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent
    // future: bookings, profile, availability, etc.
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SpecialistRoutingModule
  ]
})
export class SpecialistModule { }
