import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // MUST be here
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SpecialistRegisterComponent } from './specialist-register/specialist-register.component';
import { SpecialistLoginComponent } from './specialist-login/specialist-login.component';

@NgModule({
  declarations: [
    AuthComponent,
    SpecialistRegisterComponent,  // MUST be listed
    SpecialistLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,          // This line fixes [formGroup]
    SharedModule,                 // Fixes <app-navbar> / <app-footer>
    AuthRoutingModule
  ]
})
export class AuthModule { }