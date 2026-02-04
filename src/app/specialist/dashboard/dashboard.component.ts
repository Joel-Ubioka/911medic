import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentSpecialist: any = null;
  isOnline = false; // Availability status
  selectedRequest: any = null; // Currently selected consultation request
  appointmentTime = ''; // For input when accepting request
  consultationRequests: any[] = []; // List of pending requests
  acceptedConsultations: any[] = []; // History of accepted consultations

  ngOnInit() {
    const specialist = localStorage.getItem('currentSpecialist');
    if (specialist) {
      this.currentSpecialist = JSON.parse(specialist);
      this.loadConsultationRequests();
      this.loadAcceptedConsultations();
    }
  }

  loadConsultationRequests() {
    // Simulate loading pending consultation requests
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.consultationRequests = bookings.filter(
      (b: any) =>
        b.specialist === this.currentSpecialist?.speciality &&
        b.status === 'pending',
    );
  }

  loadAcceptedConsultations() {
    // Load history of accepted/completed consultations
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.acceptedConsultations = bookings.filter(
      (b: any) =>
        b.specialist === this.currentSpecialist?.speciality &&
        b.status === 'accepted',
    );
  }

  toggleAvailability() {
    this.isOnline = !this.isOnline;
  }

  selectRequest(request: any) {
    this.selectedRequest = { ...request };
    this.appointmentTime = '';
  }

  acceptRequest() {
    if (!this.appointmentTime || !this.selectedRequest) {
      alert('Please enter an appointment time.');
      return;
    }

    // Update booking with accepted status and appointment time
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const index = bookings.findIndex(
      (b: any) => b.id === this.selectedRequest.id,
    );

    if (index !== -1) {
      bookings[index].status = 'accepted';
      bookings[index].appointmentTime = this.appointmentTime;
      bookings[index].acceptedBy = this.currentSpecialist?.fullName;
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    // Reload data and reset
    this.loadConsultationRequests();
    this.loadAcceptedConsultations();
    this.selectedRequest = null;
    this.appointmentTime = '';
  }

  rejectRequest() {
    if (!this.selectedRequest) return;

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const index = bookings.findIndex(
      (b: any) => b.id === this.selectedRequest.id,
    );

    if (index !== -1) {
      bookings[index].status = 'rejected';
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    this.loadConsultationRequests();
    this.selectedRequest = null;
  }

  viewPatientDetails(booking: any) {
    // Display patient details when consultation is accepted
    alert(
      `Patient: ${booking.fullName}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nAge: ${booking.age}\nLocation: ${booking.location}`,
    );
  }
}
