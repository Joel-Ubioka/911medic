import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'; // ← This was missing

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SpecialistRegisterComponent } from './specialist-register/specialist-register.component';
import { SpecialistLoginComponent } from './specialist-login/specialist-login.component';
// import { PatientLoginComponent } from './patient-login/patient-login.component';
// import { PatientRegisterComponent } from './patient-register/patient-register.component';

@NgModule({
  declarations: [
    AuthComponent,
    SpecialistRegisterComponent,
    SpecialistLoginComponent,
    // PatientLoginComponent,
    // PatientRegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,      // Already good – keeps reactive forms working
    SharedModule,             // ← ADD THIS LINE (fixes navbar & footer)
    AuthRoutingModule
  ]
})
export class AuthModule { }