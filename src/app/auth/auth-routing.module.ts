import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
// import { PatientRegisterComponent } from './patient-register/patient-register.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  // { path: 'patient/register', component: PatientRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
