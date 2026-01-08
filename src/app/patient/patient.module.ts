import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// Import login/register if they are not in auth module
import { PatientLoginComponent } from '../auth/patient-login/patient-login.component';
import { PatientRegisterComponent } from '../auth/patient-register/patient-register.component';
import { ConsultationBookingComponent } from './consultation-booking/consultation-booking.component';
import { AmbulanceRequestComponent } from './ambulance-request/ambulance-request.component';
// Import your SharedModule here
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PatientLoginComponent,
    PatientRegisterComponent,
    ConsultationBookingComponent,
    AmbulanceRequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }