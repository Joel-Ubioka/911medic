import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-dispatch-ambulance',
  templateUrl: './dispatch-ambulance.component.html',
  styleUrls: ['./dispatch-ambulance.component.css'],
})
export class DispatchAmbulanceComponent implements OnInit{
 
  emergencies: any[] = [];
  activeEmergencies: any[] = [];
  dispatchedEmergencies: any[] = [];
  activeTab: 'active' | 'dispatched' = 'active';
  loading = true;
  error = false;
  showDispatchModal = false;
  selectedEmergency: any = null;
  showSuccessMessage = false;
  successMessageText = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadEmergencies();
  }

  loadEmergencies(): void {
    this.loading = true;
    this.adminService.getEmergencies().subscribe({
      next: (data) => {
        this.emergencies = data;
        this.filterEmergencies();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load emergencies', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  filterEmergencies(): void {
    this.activeEmergencies = this.emergencies.filter(e => !e.ambulanceDispatched && e.status === 'active');
    this.dispatchedEmergencies = this.emergencies.filter(e => e.ambulanceDispatched);
  }

  openDispatchModal(emergency: any): void {
    this.selectedEmergency = emergency;
    this.showDispatchModal = true;
  }

  closeDispatchModal(): void {
    this.showDispatchModal = false;
    this.selectedEmergency = null;
  }

  dispatchAmbulance(): void {
    if (!this.selectedEmergency) return;

    this.adminService.dispatchAmbulance(this.selectedEmergency.id).subscribe({
      next: () => {
        // Update local data
        const index = this.emergencies.findIndex(e => e.id === this.selectedEmergency.id);
        if (index !== -1) {
          this.emergencies[index].ambulanceDispatched = true;
          this.emergencies[index].status = 'resolved';
          this.emergencies[index].dispatchedAt = new Date();
        }
        // Refresh lists
        this.filterEmergencies();
        this.closeDispatchModal();
        // Show success message
        this.showSuccessMessage = true;
        this.successMessageText = `Ambulance dispatched for ${this.selectedEmergency.fullName}`;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      },
      error: (err) => {
        console.error('Dispatch failed', err);
        alert('Failed to dispatch ambulance. Please try again.');
      }
    });
  }

  getPaymentMethodDisplay(method: string): string {
    return method === 'bank-transfer' ? 'Bank Transfer' : 'Paystack/Flutterwave';
  }

}
