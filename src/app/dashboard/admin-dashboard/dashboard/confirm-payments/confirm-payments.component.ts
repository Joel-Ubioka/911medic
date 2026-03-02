import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-confirm-payments',
  templateUrl: './confirm-payments.component.html',
  styleUrls: ['./confirm-payments.component.css'],
})
export class ConfirmPaymentsComponent implements OnInit{
  payments: any[] = [];
  filteredPayments: any[] = [];
  loading = true;
  error = false;

  // For confirmation modal
  showConfirmModal = false;
  selectedPayment: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    // We'll get consultations and payments separately and merge them
    this.adminService.getConsultations().subscribe({
      next: (consultations) => {
        // Get payments data (we might need a separate method)
        // For now, we'll simulate by using dummyPayments via a service method
        // But since AdminService doesn't have getPayments(), we'll create one later
        this.adminService.getPayments().subscribe({
          next: (payments) => {
            // Merge payments with consultation details
            this.payments = payments.map((payment: any) => {
              const consultation = consultations.find(
                (c: any) => c.id === payment.consultationId,
              );
              return {
                ...payment,
                patientName: consultation?.patientName || 'Unknown',
                consultationType: consultation?.consultationType || 'Unknown',
                specialist: consultation?.specialist || 'Unknown',
              };
            });
            // Show only unconfirmed payments
            this.filteredPayments = this.payments.filter(
              (p) => p.status === 'unconfirmed',
            );
            this.loading = false;
          },
          error: (err) => {
            console.error('Failed to load payments', err);
            this.error = true;
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('Failed to load consultations', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  openConfirmModal(payment: any): void {
    this.selectedPayment = payment;
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectedPayment = null;
  }

  confirmPayment(): void {
    if (!this.selectedPayment) return;
    this.adminService.confirmPayment(this.selectedPayment.id).subscribe({
      next: () => {
        // Update local status
        const index = this.payments.findIndex(
          (p) => p.id === this.selectedPayment.id,
        );
        if (index !== -1) {
          this.payments[index].status = 'confirmed';
        }
        this.filteredPayments = this.payments.filter(
          (p) => p.status === 'unconfirmed',
        );
        this.closeConfirmModal();
      },
      error: (err) => {
        console.error('Payment confirmation failed', err);
        alert('Failed to confirm payment. Please try again.');
      },
    });
  }
}
