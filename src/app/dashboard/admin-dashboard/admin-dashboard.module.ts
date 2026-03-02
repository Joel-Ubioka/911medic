import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleCheckComponent } from './dashboard/role-check/role-check.component';
import { SharedModule } from "src/app/shared/shared.module";
import { AnalyticsReportComponent } from './dashboard/analytics-report/analytics-report.component';
import { NgChartsModule } from 'ng2-charts';
import { SpecialistApplicationsComponent } from './dashboard/specialist-applications/specialist-applications.component';
import { ManageConsultationsComponent } from './dashboard/manage-consultations/manage-consultations.component';
import { ConfirmPaymentsComponent } from './dashboard/confirm-payments/confirm-payments.component';
import { FormsModule } from '@angular/forms';
import { DispatchAmbulanceComponent } from './dashboard/dispatch-ambulance/dispatch-ambulance.component';
import { DetailedReportsComponent } from './dashboard/detailed-reports/detailed-reports.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RoleCheckComponent,
    AnalyticsReportComponent,
    SpecialistApplicationsComponent,
    ManageConsultationsComponent,
    ConfirmPaymentsComponent,
    DispatchAmbulanceComponent,
    DetailedReportsComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule, NgChartsModule, 
    FormsModule
]
})
export class AdminDashboardModule { }
