import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-manage-consultations',
  templateUrl: './manage-consultations.component.html',
  styleUrls: ['./manage-consultations.component.css'],
})
export class ManageConsultationsComponent implements OnInit{
  consultations: any[] = [];
  filteredConsultations: any[] = [];
  statusFilter: string = 'all';
  searchTerm: string = '';

  // For details modal
  showDetailsModal = false;
  selectedConsultation: any = null;

  // For payment confirmation modal
  showPaymentModal = false;
  paymentToConfirm: any = null;

  loading = true;
  error = false;

  role: 'owner' | 'staff' | null = null;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.role = this.adminService.getRole();
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.loading = true;
    this.adminService.getConsultations().subscribe({
      next: (data) => {
        this.consultations = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load consultations', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    let filtered = [...this.consultations];

    // Filter by status
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter((c) => c.status === this.statusFilter);
    }

    // Filter by search term (patient name, email, phone, specialist)
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.patientName?.toLowerCase().includes(term) ||
          c.patientEmail?.toLowerCase().includes(term) ||
          c.patientPhone?.toLowerCase().includes(term) ||
          c.specialist?.toLowerCase().includes(term),
      );
    }

    this.filteredConsultations = filtered;
  }

  clearFilters(): void {
    this.statusFilter = 'all';
    this.searchTerm = '';
    this.applyFilters();
  }

  viewDetails(consultation: any): void {
    this.selectedConsultation = { ...consultation };
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedConsultation = null;
  }

  // Payment confirmation (owner only)
  confirmPayment(consultation: any): void {
    this.paymentToConfirm = consultation;
    this.showPaymentModal = true;
  }

  //Route to payment confirmation page (if implemented separately)
  goToPaymentPage(): void {
    this.router.navigate(['/admin/confirm-payments']);
  }
  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.paymentToConfirm = null;
  }

  processPaymentConfirmation(): void {
    if (!this.paymentToConfirm) return;

    this.adminService.confirmPayment(this.paymentToConfirm.id).subscribe({
      next: () => {
        // Update local data
        const index = this.consultations.findIndex(
          (c) => c.id === this.paymentToConfirm.id,
        );
        if (index !== -1) {
          this.consultations[index].paymentStatus = 'confirmed';
        }
        this.applyFilters();
        this.closePaymentModal();
      },
      error: (err) => {
        console.error('Payment confirmation failed', err);
        alert('Failed to confirm payment. Please try again.');
      },
    });
  }

  // Optional: Update consultation status (e.g., mark as completed)
  updateStatus(consultation: any, newStatus: string): void {
    // In a real app, call service to update status
    // For now, just update locally
    const index = this.consultations.findIndex((c) => c.id === consultation.id);
    if (index !== -1) {
      this.consultations[index].status = newStatus;
      this.applyFilters();
    }
  }

  // Helper to get status badge class
  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-warning';
      case 'ongoing':
        return 'bg-info';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  // Helper to get payment status badge
  getPaymentStatusClass(status: string): string {
    return status === 'confirmed' ? 'bg-success' : 'bg-warning';
  }
}
