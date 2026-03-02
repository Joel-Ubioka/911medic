import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private role: 'owner' | 'staff' | null = null;

  constructor() {
    // Initialize role from localStorage when service is created
    const savedRole = localStorage.getItem('adminRole');
    if (savedRole === 'owner' || savedRole === 'staff') {
      this.role = savedRole;
    }
  }

  setRole(newRole: 'owner' | 'staff') {
    this.role = newRole;
    localStorage.setItem('adminRole', newRole);
  }

  getRole(): 'owner' | 'staff' | null {
    // Always check localStorage first, then fallback to memory
    const savedRole = localStorage.getItem('adminRole');
    if (savedRole === 'owner' || savedRole === 'staff') {
      this.role = savedRole;
      return savedRole;
    }
    return this.role;
  }

  clearRole() {
    this.role = null;
    localStorage.removeItem('adminRole');
  }

  // Dummy data for analytics and specialist applications
  private dummySpecialists = [
    {
      id: 'spec-001',
      fullName: 'Dr. Akinwande Oluwaseun',
      speciality: 'Cardiology',
      address: '15 Adeola Odeku Street, Victoria Island, Lagos',
      email: 'akinwande.olu@example.com',
      phone: '+234 802 345 6789',
      status: 'pending',
      cvUrl: 'dummy-cv-001.pdf',
      idUrl: 'dummy-id-001.jpg',
      appliedAt: new Date('2025-02-10T10:30:00'),
    },
    {
      id: 'spec-002',
      fullName: 'Dr. Ngozi Eze',
      speciality: 'Neurology',
      address: '22 Independence Layout, Enugu',
      email: 'ngozi.eze@example.com',
      phone: '+234 803 456 7890',
      status: 'pending',
      cvUrl: 'dummy-cv-002.pdf',
      idUrl: 'dummy-id-002.jpg',
      appliedAt: new Date('2025-02-12T14:15:00'),
    },
    {
      id: 'spec-003',
      fullName: 'Dr. Chidi Okonkwo',
      speciality: 'Pediatrics',
      address: '7 Zik Avenue, Awka, Anambra',
      email: 'chidi.okonkwo@example.com',
      phone: '+234 805 678 9012',
      status: 'pending',
      cvUrl: 'dummy-cv-003.pdf',
      idUrl: 'dummy-id-003.jpg',
      appliedAt: new Date('2025-02-13T09:45:00'),
    },
    {
      id: 'spec-004',
      fullName: 'Dr. Funmi Adebayo',
      speciality: 'Dermatology',
      address: '45 Allen Avenue, Ikeja, Lagos',
      email: 'funmi.adebayo@example.com',
      phone: '+234 809 123 4567',
      status: 'pending',
      cvUrl: 'dummy-cv-004.pdf',
      idUrl: 'dummy-id-004.jpg',
      appliedAt: new Date('2025-02-14T11:20:00'),
    },
    {
      id: 'spec-005',
      fullName: 'Dr. Emeka Okafor',
      speciality: 'Orthopedics',
      address: '18 Trans-Ekulu Road, Enugu',
      email: 'emeka.okafor@example.com',
      phone: '+234 806 543 2109',
      status: 'approved',
      cvUrl: 'dummy-cv-005.pdf',
      idUrl: 'dummy-id-005.jpg',
      appliedAt: new Date('2025-02-05T16:00:00'),
    },
    {
      id: 'spec-006',
      fullName: 'Dr. Adaobi Nwosu',
      speciality: 'Cardiology',
      address: '32 Royce Road, Owerri, Imo',
      email: 'adaobi.nwosu@example.com',
      phone: '+234 810 987 6543',
      status: 'approved',
      cvUrl: 'dummy-cv-006.pdf',
      idUrl: 'dummy-id-006.jpg',
      appliedAt: new Date('2025-02-07T13:30:00'),
    },
    {
      id: 'spec-007',
      fullName: 'Dr. Babatunde Adeleke',
      speciality: 'Neurology',
      address: '9 Kudirat Abiola Way, Ikeja, Lagos',
      email: 'babatunde.adeleke@example.com',
      phone: '+234 807 654 3210',
      status: 'approved',
      cvUrl: 'dummy-cv-007.pdf',
      idUrl: 'dummy-id-007.jpg',
      appliedAt: new Date('2025-02-09T10:10:00'),
    },
    {
      id: 'spec-008',
      fullName: 'Dr. Chioma Okafor',
      speciality: 'Pediatrics',
      address: '55 Ezimgbu Road, Port Harcourt',
      email: 'chioma.okafor@example.com',
      phone: '+234 812 345 6789',
      status: 'rejected',
      cvUrl: 'dummy-cv-008.pdf',
      idUrl: 'dummy-id-008.jpg',
      appliedAt: new Date('2025-02-11T08:45:00'),
    },
  ];

  // Dummy consultations
  private dummyConsultations = [
    {
      id: 'cons-001',
      patientName: 'Chukwu Isioma',
      patientEmail: 'isioma.chukwu@example.com',
      patientPhone: '+234 706 234 5678',
      age: 45,
      gender: 'Male',
      location: 'Lagos, Nigeria',
      forWhom: 'self',
      consultationType: 'Online',
      specialist: 'Dr. Akinwande',
      specialistId: 'spec-001',
      specialty: 'Cardiology',
      timeframe: 'immediate',
      status: 'pending', // pending, ongoing, completed, cancelled
      paymentStatus: 'unconfirmed',
      amount: 15000,
      paymentMethod: 'paystack',
      receipt: null,
      requestedAt: new Date('2025-02-10T10:30:00'),
      appointmentTime: null,
    },
    {
      id: 'cons-002',
      patientName: 'Oluwaseun Adebayo',
      patientEmail: 'oluwaseun.adebayo@example.com',
      patientPhone: '+234 701 987 6543',
      age: 38,
      gender: 'Female',
      location: 'Abuja, Nigeria',
      forWhom: 'self',
      consultationType: 'In-person',
      specialist: 'Dr. Ngozi Eze',
      specialistId: 'spec-002',
      specialty: 'Neurology',
      timeframe: '24-hours',
      status: 'ongoing',
      paymentStatus: 'confirmed',
      amount: 30000,
      paymentMethod: 'bank-transfer',
      receipt: 'receipt-002.pdf',
      requestedAt: new Date('2025-02-12T14:15:00'),
      appointmentTime: new Date('2025-02-20T10:00:00'),
    },
    {
      id: 'cons-003',
      patientName: 'Blessing Okoro',
      patientEmail: 'blessing.okoro@example.com',
      patientPhone: '+234 803 456 7890',
      age: 29,
      gender: 'Female',
      location: 'Port Harcourt, Nigeria',
      forWhom: 'self',
      consultationType: 'Online',
      specialist: 'Dr. Chidi Okonkwo',
      specialistId: 'spec-003',
      specialty: 'Pediatrics',
      timeframe: '48-hours',
      status: 'completed',
      paymentStatus: 'confirmed',
      amount: 15000,
      paymentMethod: 'paystack',
      receipt: null,
      requestedAt: new Date('2025-02-13T09:45:00'),
      appointmentTime: new Date('2025-02-15T15:30:00'),
    },
    {
      id: 'cons-004',
      patientName: 'Musa Abubakar',
      patientEmail: 'musa.abubakar@example.com',
      patientPhone: '+234 805 678 9012',
      age: 52,
      gender: 'Male',
      location: 'Kano, Nigeria',
      forWhom: 'self',
      consultationType: 'Online',
      specialist: 'Dr. Funmi Adebayo',
      specialistId: 'spec-004',
      specialty: 'Dermatology',
      timeframe: '24-hours',
      status: 'pending',
      paymentStatus: 'unconfirmed',
      amount: 15000,
      paymentMethod: 'paystack',
      receipt: null,
      requestedAt: new Date('2025-02-14T11:20:00'),
      appointmentTime: null,
    },
    {
      id: 'cons-005',
      patientName: 'Ngozi Eze',
      patientEmail: 'ngozi.eze@example.com',
      patientPhone: '+234 809 123 4567',
      age: 41,
      gender: 'Female',
      location: 'Enugu, Nigeria',
      forWhom: 'other',
      otherPerson: 'Chioma (8 years)',
      consultationType: 'In-person',
      specialist: 'Dr. Emeka Okafor',
      specialistId: 'spec-005',
      specialty: 'Orthopedics',
      timeframe: 'immediate',
      status: 'ongoing',
      paymentStatus: 'confirmed',
      amount: 30000,
      paymentMethod: 'bank-transfer',
      receipt: 'receipt-005.pdf',
      requestedAt: new Date('2025-02-15T16:00:00'),
      appointmentTime: new Date('2025-02-22T09:00:00'),
    },
    {
      id: 'cons-006',
      patientName: 'Amara Ikpeazu',
      patientEmail: 'amara.ikpeazu@example.com',
      patientPhone: '+234 810 987 6543',
      age: 35,
      gender: 'Female',
      location: 'Lagos, Nigeria',
      forWhom: 'self',
      consultationType: 'Online',
      specialist: 'Dr. Adaobi Nwosu',
      specialistId: 'spec-006',
      specialty: 'Cardiology',
      timeframe: '48-hours',
      status: 'completed',
      paymentStatus: 'confirmed',
      amount: 15000,
      paymentMethod: 'paystack',
      receipt: null,
      requestedAt: new Date('2025-02-16T13:30:00'),
      appointmentTime: new Date('2025-02-18T11:00:00'),
    },
    {
      id: 'cons-007',
      patientName: 'Segun Williams',
      patientEmail: 'segun.williams@example.com',
      patientPhone: '+234 812 345 6789',
      age: 47,
      gender: 'Male',
      location: 'Ibadan, Nigeria',
      forWhom: 'self',
      consultationType: 'Online',
      specialist: 'Dr. Babatunde Adeleke',
      specialistId: 'spec-007',
      specialty: 'Neurology',
      timeframe: '24-hours',
      status: 'cancelled',
      paymentStatus: 'unconfirmed',
      amount: 15000,
      paymentMethod: 'paystack',
      receipt: null,
      requestedAt: new Date('2025-02-17T08:45:00'),
      appointmentTime: null,
    },
  ];

  // Dummy emergencies
  private dummyEmergencies = [
    {
      id: 'emerg-001',
      fullName: 'Chukwu Isioma',
      phone: '+234 706 234 5678',
      location: 'Lagos, Nigeria',
      type: 'Cardiac Arrest',
      description: 'Patient experiencing chest pain and difficulty breathing.',
      paymentMethod: 'paystack',
      receipt: null,
      status: 'active', // active, resolved, cancelled
      ambulanceDispatched: false,
      reportedAt: new Date(Date.now() - 15 * 60000), // 15 mins ago
    },
    {
      id: 'emerg-002',
      fullName: 'Aminat Yusuf',
      phone: '+234 803 123 4567',
      location: 'Abuja, Nigeria',
      type: 'Accident',
      description: 'Road traffic accident with multiple injuries.',
      paymentMethod: 'bank-transfer',
      receipt: 'receipt-emerg-002.pdf',
      status: 'active',
      ambulanceDispatched: false,
      reportedAt: new Date(Date.now() - 45 * 60000),
    },
    {
      id: 'emerg-003',
      fullName: 'Oluwaseun Adebayo',
      phone: '+234 809 876 5432',
      location: 'Ibadan, Nigeria',
      type: 'Stroke',
      description: 'Elderly patient showing stroke symptoms.',
      paymentMethod: 'paystack',
      receipt: null,
      status: 'active',
      ambulanceDispatched: false,
      reportedAt: new Date(Date.now() - 2 * 60 * 60000),
    },
    {
      id: 'emerg-004',
      fullName: 'Ngozi Eze',
      phone: '+234 805 432 1098',
      location: 'Enugu, Nigeria',
      type: 'Hospital Transfer',
      description:
        'Transfer from general hospital to specialist cardiac center.',
      paymentMethod: 'bank-transfer',
      receipt: 'receipt-emerg-004.pdf',
      status: 'resolved',
      ambulanceDispatched: true,
      reportedAt: new Date(Date.now() - 5 * 60 * 60000),
      dispatchedAt: new Date(Date.now() - 4 * 60 * 60000),
    },
    {
      id: 'emerg-005',
      fullName: 'Emeka Okafor',
      phone: '+234 802 345 6789',
      location: 'Port Harcourt, Nigeria',
      type: 'Respiratory Distress',
      description: 'Severe asthma attack.',
      paymentMethod: 'paystack',
      receipt: null,
      status: 'resolved',
      ambulanceDispatched: true,
      reportedAt: new Date(Date.now() - 3 * 60 * 60000),
      dispatchedAt: new Date(Date.now() - 2.5 * 60 * 60000),
    },
  ];

  // Dummy payments
  private dummyPayments = [
    {
      id: 'pay-001',
      consultationId: 'cons-001',
      amount: 5000,
      status: 'unconfirmed',
      paidAt: new Date(),
    },
    {
      id: 'pay-002',
      consultationId: 'cons-002',
      amount: 7500,
      status: 'confirmed',
      paidAt: new Date(),
    },
    {
      id: 'pay-003',
      consultationId: 'cons-003',
      amount: 6000,
      status: 'confirmed',
      paidAt: new Date(),
    },
    {
      id: 'pay-004',
      consultationId: 'cons-004',
      amount: 5500,
      status: 'unconfirmed',
      paidAt: new Date(),
    },
    {
      id: 'pay-005',
      consultationId: 'cons-005',
      amount: 8000,
      status: 'confirmed',
      paidAt: new Date(),
    },
    {
      id: 'pay-006',
      consultationId: 'cons-006',
      amount: 6500,
      status: 'confirmed',
      paidAt: new Date(),
    },
    {
      id: 'pay-007',
      consultationId: 'cons-007',
      amount: 7000,
      status: 'unconfirmed',
      paidAt: new Date(),
    },
  ];

  getAnalytics(): Observable<any> {
    // Calculate real-time stats from dummy data
    const totalSpecialists = this.dummySpecialists.length;
    const pendingApprovals = this.dummySpecialists.filter(
      (s) => s.status === 'pending',
    ).length;
    const approvedSpecialists = this.dummySpecialists.filter(
      (s) => s.status === 'approved',
    ).length;

    const activeConsultations = this.dummyConsultations.filter(
      (c) => c.status === 'ongoing',
    ).length;
    const completedConsultations = this.dummyConsultations.filter(
      (c) => c.status === 'completed',
    ).length;
    const pendingConsultations = this.dummyConsultations.filter(
      (c) => c.status === 'pending',
    ).length;

    const emergenciesActive = this.dummyEmergencies.filter(
      (e) => e.status === 'active',
    ).length;
    const emergenciesResolved = this.dummyEmergencies.filter(
      (e) => e.status === 'resolved',
    ).length;

    // Calculate revenue
    const confirmedPayments = this.dummyPayments.filter(
      (p) => p.status === 'confirmed',
    );
    const totalRevenue = confirmedPayments.reduce(
      (sum, p) => sum + p.amount,
      0,
    );
    const averageMonthlyRevenue = Math.round(totalRevenue / 6); // Assuming 6 months of data

    // Calculate online vs physical revenue
    const onlineRevenue = confirmedPayments
      .filter(
        (p) =>
          p.id.includes('001') || p.id.includes('003') || p.id.includes('006'),
      )
      .reduce((sum, p) => sum + p.amount, 0);
    const physicalRevenue = confirmedPayments
      .filter((p) => p.id.includes('002') || p.id.includes('005'))
      .reduce((sum, p) => sum + p.amount, 0);
    const emergencyRevenue = confirmedPayments
      .filter((p) => p.id.includes('004') || p.id.includes('007'))
      .reduce((sum, p) => sum + p.amount, 0);

    // Top specialists
    const topSpecialists = [
      {
        name: 'Dr. Adaobi Nwosu',
        specialty: 'Cardiology',
        consultations: 45,
        rating: 4.9,
        revenue: 45000,
      },
      {
        name: 'Dr. Chidi Okonkwo',
        specialty: 'Pediatrics',
        consultations: 38,
        rating: 4.8,
        revenue: 38000,
      },
      {
        name: 'Dr. Babatunde Adeleke',
        specialty: 'Neurology',
        consultations: 32,
        rating: 4.7,
        revenue: 42000,
      },
      {
        name: 'Dr. Funmi Adebayo',
        specialty: 'Dermatology',
        consultations: 28,
        rating: 4.6,
        revenue: 35000,
      },
      {
        name: 'Dr. Emeka Okafor',
        specialty: 'Orthopedics',
        consultations: 25,
        rating: 4.5,
        revenue: 40000,
      },
    ];

    // Recent emergencies
    const recentEmergencies = this.dummyEmergencies.slice(0, 5).map((e) => ({
      ...e,
      reportedAt: new Date(),
    }));

    // Consultations by specialty
    const consultationBySpecialty = [
      { name: 'Cardiology', count: 85, percentage: 28 },
      { name: 'Neurology', count: 72, percentage: 24 },
      { name: 'Pediatrics', count: 65, percentage: 22 },
      { name: 'Dermatology', count: 48, percentage: 16 },
      { name: 'Orthopedics', count: 30, percentage: 10 },
    ];

    return of({
      totalSpecialists: totalSpecialists,
      pendingApprovals: pendingApprovals,
      activeConsultations: activeConsultations,
      specialistGrowth: 12,
      pendingGrowth: pendingApprovals,

      consultationBreakdown: {
        online: 15,
        physical: 8,
      },

      emergencies: {
        total: this.dummyEmergencies.length,
        active: emergenciesActive,
        resolved: emergenciesResolved,
      },

      revenue: {
        total: totalRevenue,
        growth: 15,
        averageMonthly: averageMonthlyRevenue,
      },

      revenueBreakdown: {
        online: onlineRevenue,
        physical: physicalRevenue,
        emergency: emergencyRevenue,
      },

      patients: {
        total: 1250,
        newThisMonth: 87,
      },

      specialistPerformance: {
        averageRating: 4.7,
        totalReviews: 324,
      },

      consultationSummary: {
        total: this.dummyConsultations.length,
        completed: completedConsultations,
        pending: pendingConsultations,
        ongoing: activeConsultations,
        cancelled: 5,
      },

      consultationBySpecialty: consultationBySpecialty,
      topSpecialists: topSpecialists,
      recentEmergencies: recentEmergencies,

      monthlyRevenue: [
        {
          data: [12000, 15000, 18000, 22000, 25000, 32000],
          label: 'Revenue',
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          fill: false,
          tension: 0.4,
        },
      ],

      specialistDistribution: {
        labels: [
          'Cardiology',
          'Neurology',
          'Pediatrics',
          'Dermatology',
          'Orthopedics',
        ],
        datasets: [
          {
            data: [8, 6, 5, 4, 2],
            backgroundColor: [
              '#0d6efd',
              '#c0392b',
              '#ffc107',
              '#28a745',
              '#6f42c1',
            ],
          },
        ],
      },
    });
  }

  getSpecialistApplications(): Observable<any[]> {
    return of(this.dummySpecialists);
  }

  approveSpecialist(id: string): Observable<any> {
    const spec = this.dummySpecialists.find((s) => s.id === id);
    if (spec) spec.status = 'approved';
    return of({ success: true });
  }

  rejectSpecialist(id: string): Observable<any> {
    const spec = this.dummySpecialists.find((s) => s.id === id);
    if (spec) spec.status = 'rejected';
    return of({ success: true });
  }

  getConsultations(): Observable<any[]> {
    return of(this.dummyConsultations);
  }

  confirmPayment(paymentId: string): Observable<any> {
    const pay = this.dummyPayments.find((p) => p.id === paymentId);
    if (pay) pay.status = 'confirmed';
    return of({ success: true });
  }

  getEmergencies(): Observable<any[]> {
    return of(this.dummyEmergencies);
  }

  dispatchAmbulance(emergencyId: string): Observable<any> {
    const emerg = this.dummyEmergencies.find((e) => e.id === emergencyId);
    if (emerg) emerg.ambulanceDispatched = true;
    return of({ success: true });
  }

  getPayments(): Observable<any[]> {
    return of(this.dummyPayments);
  }
}
