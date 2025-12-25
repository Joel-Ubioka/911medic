import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientLoginComponent } from '../auth/patient-login/patient-login.component';
import { PatientRegisterComponent } from '../auth/patient-register/patient-register.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },                  // /patient → dashboard
  { path: 'login', component: PatientLoginComponent },          // /patient/login
  { path: 'register', component: PatientRegisterComponent },    // /patient/register
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}