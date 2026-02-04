import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaystackService } from 'src/app/core/services/paystack.service';

// Declare bootstrap as global (from Bootstrap JS CDN)
declare var bootstrap: any;

@Component({
  selector: 'app-consultation-booking',
  templateUrl: './consultation-booking.component.html',
  styleUrls: ['./consultation-booking.component.css'],
})
export class ConsultationBookingComponent implements AfterViewInit {
  bookingForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  paymentMethod = '';
  paymentCompleted = false; // Tracks if Paystack payment was completed

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paystackService: PaystackService,
  ) {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^[+]?[0-9]{10,15}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      forWhom: ['self', Validators.required],
      otherPerson: [''],
      consultationType: ['', Validators.required],
      specialist: ['', Validators.required],
      timeframe: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      receipt: [null],
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  ngAfterViewInit() {
    this.setupPaymentModal();
  }

  setupPaymentModal() {
    const payButton = document.getElementById('payButton') as HTMLButtonElement;

    if (payButton) {
      payButton.addEventListener('click', () => {
        this.handlePaystackPayment();
      });
    }
  }

  handlePaystackPayment() {
    const email = this.bookingForm.get('email')?.value;
    const specialist = this.bookingForm.get('specialist')?.value;

    // Get amount based on selected specialist
    const amount = this.getAmountForSpecialist(specialist);

    // Generate unique reference
    const reference = `911medic-${Date.now()}`;

    // Call Paystack service
    this.paystackService.initiatePayment(
      email,
      amount,
      reference,
      (response) => this.onPaymentSuccess(response), // Success callback
      () => this.onPaymentClose(), // Close callback
    );
  }

  // Map specialist to amount
  getAmountForSpecialist(specialist: string): number {
    const priceMap: { [key: string]: number } = {
      'cardiologist-online': 15000,
      'dermatologist-online': 15000,
      'mental-health-online': 15000,
      'pediatrician-online': 15000,
      'gynecologist-online': 15000,
      'dietician-online': 10000,
      'cardiologist-physical': 30000,
      'neuro-surgeon-physical': 30000,
      'urologist-physical': 30000,
      'oncologist-physical': 30000,
      'pediatrician-physical': 30000,
      'gynecologist-physical': 30000,
    };
    return priceMap[specialist] || 0;
  }

  onPaymentSuccess(response: any) {
    // response contains: reference, status, trans (transaction object)
    console.log('Payment successful:', response);
    this.paymentCompleted = true;

    // Show success UI
    const paymentSuccess = document.getElementById('paymentSuccess');
    const payButtonContainer = document.getElementById('payButtonContainer');

    payButtonContainer?.classList.add('d-none');
    paymentSuccess?.classList.remove('d-none');

    // Close modal after 3 seconds
    setTimeout(() => {
      const modalElement = document.getElementById('paymentModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }, 3000);
  }

  onPaymentClose() {
    console.log('Payment window closed');
    // User closed the payment modal
  }
  onSubmit() {
    this.submitted = true;
    this.bookingForm.markAllAsTouched();

    if (this.bookingForm.invalid) return;

    // Require Paystack payment completion
    if (this.paymentMethod === 'paystack' && !this.paymentCompleted) {
      alert('Please complete the payment using Paystack before submitting.');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      // Save booking to localStorage for specialist dashboard
      const booking = {
        id: Date.now(),
        ...this.bookingForm.value,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      this.successMessage = 'Booking successful! Details sent to your email.';
      this.isLoading = false;

      setTimeout(() => {
        this.router.navigate(['/patient']);
      }, 4000);
    }, 1500);
  }

  onPaymentChange(method: string) {
    this.paymentMethod = method;
    // Only reset if switching away from paystack
    if (method !== 'paystack') {
      this.paymentCompleted = false;
    }
  }

  openPaymentModal() {
    setTimeout(() => {
      const modalElement = document.getElementById('paymentModal');
      if (modalElement) {
        // Remove any existing modal instance
        const existingModal = bootstrap.Modal.getInstance(modalElement);
        if (existingModal) {
          existingModal.dispose();
        }
        // Create new modal with simple config
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 0);
  }

  onReceiptUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bookingForm.patchValue({ receipt: file });
    }
  }
}
