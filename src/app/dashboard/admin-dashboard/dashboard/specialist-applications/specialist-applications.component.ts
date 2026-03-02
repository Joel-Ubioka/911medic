import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-specialist-applications',
  templateUrl: './specialist-applications.component.html',
  styleUrls: ['./specialist-applications.component.css'],
})
export class SpecialistApplicationsComponent implements OnInit{
  specialists: any[] = [];
  pendingSpecialists: any[] = [];
  approvedSpecialists: any[] = [];
  rejectedSpecialists: any[] = [];

  // For document preview modal
  showDocumentModal = false;
  selectedDocument: {
    type: 'cv' | 'id';
    url: string;
    specialistName: string;
  } | null = null;

  // For full application details modal
  showDetailsModal = false;
  selectedSpecialist: any = null;

  loading = true;
  error = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.adminService.getSpecialistApplications().subscribe({
      next: (data) => {
        this.specialists = data;
        this.filterSpecialists();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load applications', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  filterSpecialists(): void {
    this.pendingSpecialists = this.specialists.filter(
      (s) => s.status === 'pending',
    );
    this.approvedSpecialists = this.specialists.filter(
      (s) => s.status === 'approved',
    );
    this.rejectedSpecialists = this.specialists.filter(
      (s) => s.status === 'rejected',
    );
  }

  approveSpecialist(id: string): void {
    this.adminService.approveSpecialist(id).subscribe({
      next: () => {
        const specialist = this.specialists.find((s) => s.id === id);
        if (specialist) specialist.status = 'approved';
        this.filterSpecialists();
      },
      error: (err) => console.error('Approve failed', err),
    });
  }

  rejectSpecialist(id: string): void {
    this.adminService.rejectSpecialist(id).subscribe({
      next: () => {
        const specialist = this.specialists.find((s) => s.id === id);
        if (specialist) specialist.status = 'rejected';
        this.filterSpecialists();
      },
      error: (err) => console.error('Reject failed', err),
    });
  }

  viewDocument(type: 'cv' | 'id', specialist: any): void {
    this.selectedDocument = {
      type,
      url: specialist[type === 'cv' ? 'cvUrl' : 'idUrl'],
      specialistName: specialist.fullName,
    };
    this.showDocumentModal = true;
  }

  closeDocumentModal(): void {
    this.showDocumentModal = false;
    this.selectedDocument = null;
  }

  viewDetails(specialist: any): void {
    this.selectedSpecialist = { ...specialist };
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedSpecialist = null;
  }
}
