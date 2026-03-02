import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentSpecialist: any = null;
  isOnline = false;
  selectedRequest: any = null;
  appointmentTime = '';
  consultationRequests: any[] = [];
  acceptedConsultations: any[] = [];
  selectedConsultationForModal: any = null;
  showPatientDetailsModal = false;

  // Modal states for Quick Actions
  showManageProfileModal = false;
  showStatisticsModal = false;
  showMessagesModal = false;

  // Dummy data for modals
  profileData: any = null;
  statisticsData: any = null;
  messagesData: any[] = [];

  ngOnInit() {
    this.loadCurrentSpecialist();

    // Always load fresh dummy data directly — no localStorage dependency for display
    this.consultationRequests = this.getDummyPendingRequests();
    this.acceptedConsultations = this.getDummyAcceptedConsultations();

    // Initialize modal dummy data
    this.initializeModalData();

    console.log('Dashboard loaded with dummy data');
    console.log('Pending requests:', this.consultationRequests.length);
    console.log('Accepted consultations:', this.acceptedConsultations.length);
  }

  private initializeModalData() {
    this.profileData = this.getDummyProfileData();
    this.statisticsData = this.getDummyStatisticsData();
    this.messagesData = this.getDummyMessagesData();
  }

  private loadCurrentSpecialist() {
    const specialistJson = localStorage.getItem('currentSpecialist');
    if (specialistJson) {
      this.currentSpecialist = JSON.parse(specialistJson);
    } else {
      this.currentSpecialist = {
        id: 'spec-001',
        fullName: 'Dr. Akinwande',
        speciality: 'Cardiology',
        email: 'dr.akinwande@911medic.com',
        phone: '+234 809 123 4567',
      };
      // Uncomment if you want it to persist during dev:
      // localStorage.setItem('currentSpecialist', JSON.stringify(this.currentSpecialist));
    }
  }

  getDummyPendingRequests() {
    return [
      {
        id: 'booking-001',
        fullName: 'Chukwu Isioma',
        email: 'isioma.chukwu@email.com',
        phone: '+234 706 234 5678',
        age: 45,
        gender: 'Male',
        location: 'Lagos, Nigeria',
        consultationType: 'Online',
        description:
          'Experiencing chest pain and shortness of breath. Need urgent consultation.',
        speciality: 'Cardiology',
        status: 'pending',
        requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'booking-002',
        fullName: 'Adenike Adebayo',
        email: 'adenike.a@email.com',
        phone: '+234 701 987 6543',
        age: 38,
        gender: 'Female',
        location: 'Abuja, Nigeria',
        consultationType: 'Online',
        description:
          'Follow-up on previous cardiac issues. Recent ECG shows irregularities.',
        speciality: 'Cardiology',
        status: 'pending',
        requestedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'booking-003',
        fullName: 'Emeka Okonkwo',
        email: 'emeka.okonkwo@email.com',
        phone: '+234 805 456 7890',
        age: 52,
        gender: 'Male',
        location: 'Port Harcourt, Nigeria',
        consultationType: 'In-Person',
        description:
          'High blood pressure concerns. Needs comprehensive cardiac evaluation.',
        speciality: 'Cardiology',
        status: 'pending',
        requestedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }

  getDummyAcceptedConsultations() {
    return [
      {
        id: 'booking-101',
        fullName: 'Okoro Chioma',
        email: 'chioma.okoro@email.com',
        phone: '+234 703 111 2222',
        age: 41,
        gender: 'Female',
        location: 'Lagos, Nigeria',
        consultationType: 'Online',
        description: 'Heart palpitations and dizziness during exercise.',
        speciality: 'Cardiology',
        status: 'accepted',
        appointmentTime: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedBy: 'Dr. Akinwande',
        requestedAt: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedAt: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
      {
        id: 'booking-102',
        fullName: 'Adeyemi Kunle',
        email: 'kunle.adeyemi@email.com',
        phone: '+234 810 333 4444',
        age: 55,
        gender: 'Male',
        location: 'Ibadan, Nigeria',
        consultationType: 'In-Person',
        description: 'Post-surgery follow-up after coronary artery bypass.',
        speciality: 'Cardiology',
        status: 'accepted',
        appointmentTime: new Date(
          Date.now() + 1 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedBy: 'Dr. Akinwande',
        requestedAt: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedAt: new Date(
          Date.now() - 4 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
      {
        id: 'booking-103',
        fullName: 'Ngozi Eze',
        email: 'ngozi.eze@email.com',
        phone: '+234 815 555 6666',
        age: 48,
        gender: 'Female',
        location: 'Enugu, Nigeria',
        consultationType: 'Online',
        description: 'Monitoring of hypertension and medication adjustment.',
        speciality: 'Cardiology',
        status: 'accepted',
        appointmentTime: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedBy: 'Dr. Akinwande',
        requestedAt: new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedAt: new Date(
          Date.now() - 6 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
      {
        id: 'booking-104',
        fullName: 'Oluwaseun Afolabi',
        email: 'seun.afolabi@email.com',
        phone: '+234 802 777 8888',
        age: 35,
        gender: 'Male',
        location: 'Kano, Nigeria',
        consultationType: 'Online',
        description: 'Preventive cardiac screening and lifestyle consultation.',
        speciality: 'Cardiology',
        status: 'accepted',
        appointmentTime: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedBy: 'Dr. Akinwande',
        requestedAt: new Date(
          Date.now() - 10 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        acceptedAt: new Date(
          Date.now() - 9 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        completed: true,
      },
    ];
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

    // For now we still update localStorage so the change is "saved"
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const index = bookings.findIndex(
      (b: any) => b.id === this.selectedRequest.id,
    );

    if (index !== -1) {
      bookings[index].status = 'accepted';
      bookings[index].appointmentTime = this.appointmentTime;
      bookings[index].acceptedBy = this.currentSpecialist?.fullName;
      localStorage.setItem('bookings', JSON.stringify(bookings));
    } else {
      // If not found in storage, we can still simulate it in UI
      this.selectedRequest.status = 'accepted';
      this.selectedRequest.appointmentTime = this.appointmentTime;
      this.selectedRequest.acceptedBy = this.currentSpecialist?.fullName;

      // Move from pending to accepted in current view
      this.consultationRequests = this.consultationRequests.filter(
        (r) => r.id !== this.selectedRequest.id,
      );
      this.acceptedConsultations = [
        ...this.acceptedConsultations,
        this.selectedRequest,
      ];
    }

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

    // Remove from pending in UI
    this.consultationRequests = this.consultationRequests.filter(
      (r) => r.id !== this.selectedRequest.id,
    );

    this.selectedRequest = null;
  }

  viewPatientDetails(booking: any) {
    this.selectedConsultationForModal = { ...booking };
    this.showPatientDetailsModal = true;
  }

  closePatientDetailsModal() {
    this.showPatientDetailsModal = false;
    this.selectedConsultationForModal = null;
  }

  // Manage Profile Modal Methods
  openManageProfileModal() {
    this.showManageProfileModal = true;
  }

  closeManageProfileModal() {
    this.showManageProfileModal = false;
  }

  saveProfileChanges() {
    alert('Profile updated successfully!');
    this.closeManageProfileModal();
  }

  getDummyProfileData() {
    return {
      fullName: 'Dr. Akinwande Oluwaseun',
      speciality: 'Cardiology',
      qualifications:
        'MBBS, MD Cardiology, Fellowship in Interventional Cardiology',
      yearsOfExperience: 12,
      hospital: 'Lagos Heart Medical Center',
      bio: 'Specialist in cardiovascular diseases with expertise in coronary interventions and heart failure management.',
      licenseNumber: 'MED-NG-2012-4567',
      rating: 4.8,
      totalConsultations: 342,
      languages: ['English', 'Yoruba', 'Hausa'],
      consultationFee: 5000,
      availability: {
        monday: '9:00 AM - 5:00 PM',
        tuesday: '9:00 AM - 5:00 PM',
        wednesday: '9:00 AM - 5:00 PM',
        thursday: '9:00 AM - 5:00 PM',
        friday: '9:00 AM - 3:00 PM',
        saturday: 'Closed',
        sunday: 'Closed',
      },
    };
  }

  // View Statistics Modal Methods
  openStatisticsModal() {
    this.showStatisticsModal = true;
  }

  closeStatisticsModal() {
    this.showStatisticsModal = false;
  }

  getDummyStatisticsData() {
    return {
      totalConsultations: 342,
      completedConsultations: 328,
      pendingConsultations: 12,
      cancelledConsultations: 2,
      averageRating: 4.8,
      totalReviews: 285,
      patientSatisfaction: 94.5,
      onTimeRate: 98.2,
      monthlyGrowth: 12.5,
      revenueThisMonth: 2750000,
      topComplaintTypes: [
        { type: 'Chest Pain', count: 89, percentage: 26 },
        { type: 'Hypertension', count: 74, percentage: 22 },
        { type: 'Heart Palpitations', count: 62, percentage: 18 },
        { type: 'Follow-up Checkup', count: 58, percentage: 17 },
        { type: 'Other', count: 59, percentage: 17 },
      ],
      consultationsByType: {
        online: 198,
        inPerson: 130,
      },
      thisMonthConsultations: 34,
      thisMonthRating: 4.9,
      yearOverYearGrowth: 18.7,
    };
  }

  // Messages Modal Methods
  openMessagesModal() {
    this.showMessagesModal = true;
  }

  closeMessagesModal() {
    this.showMessagesModal = false;
  }

  getDummyMessagesData() {
    return [
      {
        id: 'msg-001',
        patientName: 'Chukwu Isioma',
        patientImage: '👨‍🦱',
        lastMessage: 'Thank you for the consultation. I feel much better now.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unread: true,
        status: 'online',
      },
      {
        id: 'msg-002',
        patientName: 'Adenike Adebayo',
        patientImage: '👩‍🦱',
        lastMessage: 'Doctor, can I take this medication with food?',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        unread: true,
        status: 'online',
      },
      {
        id: 'msg-003',
        patientName: 'Okoro Chioma',
        patientImage: '👩‍🦱',
        lastMessage: 'My appointment is confirmed for next Tuesday at 2 PM',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        unread: false,
        status: 'offline',
      },
      {
        id: 'msg-004',
        patientName: 'Emeka Okonkwo',
        patientImage: '👨‍🦱',
        lastMessage: 'Looking forward to my consultation tomorrow.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        unread: false,
        status: 'offline',
      },
      {
        id: 'msg-005',
        patientName: 'Oluwaseun Afolabi',
        patientImage: '👨‍🦱',
        lastMessage: 'The blood pressure readings have improved significantly.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        unread: false,
        status: 'offline',
      },
    ];
  }
}
