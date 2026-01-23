import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialistRegisterComponent } from '../auth/specialist-register/specialist-register.component.spec';
import { SpecialistLoginComponent } from '../auth/specialist-login/specialist-login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },           // /specialist → dashboard
  { path: 'register', component: SpecialistRegisterComponent },    // /specialist/register → signup form
  { path: 'login', component: SpecialistLoginComponent },          // /specialist/login → login form
  { path: '**', redirectTo: '' }                         // Catch-all → dashboard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
