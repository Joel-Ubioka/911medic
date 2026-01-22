import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialistRegisterComponent } from '../auth/specialist-register/specialist-register.component'; // ← Already correct

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'register', component: SpecialistRegisterComponent }, // ← Already correct
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }