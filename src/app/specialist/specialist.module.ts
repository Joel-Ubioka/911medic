import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
    // add more later: bookings, etc.
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SpecialistRoutingModule
  ]
})
export class SpecialistModule { }