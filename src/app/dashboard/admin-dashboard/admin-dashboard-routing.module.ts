import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleCheckComponent } from './dashboard/role-check/role-check.component';
import { AnalyticsReportComponent } from './dashboard/analytics-report/analytics-report.component';
import { SpecialistApplicationsComponent } from './dashboard/specialist-applications/specialist-applications.component';
import { ManageConsultationsComponent } from './dashboard/manage-consultations/manage-consultations.component';
import { ConfirmPaymentsComponent } from './dashboard/confirm-payments/confirm-payments.component';
import { DispatchAmbulanceComponent } from './dashboard/dispatch-ambulance/dispatch-ambulance.component';
import { DetailedReportsComponent } from './dashboard/detailed-reports/detailed-reports.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsReportComponent },
      { path: 'specialists', component: SpecialistApplicationsComponent },
      { path: 'consultations', component: ManageConsultationsComponent },
      { path: 'confirm-payments', component: ConfirmPaymentsComponent },
      { path: 'dispatch', component: DispatchAmbulanceComponent },
      { path: 'reports', component: DetailedReportsComponent },
      { path: '**', redirectTo: 'analytics' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }