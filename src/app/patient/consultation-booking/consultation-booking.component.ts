import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Declare bootstrap as global (from Bootstrap JS CDN)
declare var bootstrap: any;

@Component({
  selector: 'app-consultation-booking',
  templateUrl: './consultation-booking.component.html',
  styleUrls: ['./consultation-booking.component.css']
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
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{10,15}$')]],
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
      receipt: [null]
    });
  }

  get f() { return this.bookingForm.controls; }

  ngAfterViewInit() {
    this.setupPaymentModal();
  }

  setupPaymentModal() {
    const payButton = document.getElementById('payButton') as HTMLButtonElement;
    const paymentSuccess = document.getElementById('paymentSuccess');
    const payButtonContainer = document.getElementById('payButtonContainer');

    if (payButton) {
      payButton.addEventListener('click', () => {
        payButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        payButton.disabled = true;

        setTimeout(() => {
          payButtonContainer?.classList.add('d-none');
          paymentSuccess?.classList.remove('d-none');

          setTimeout(() => {
            const modalElement = document.getElementById('paymentModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();

            // Reset modal
            payButtonContainer?.classList.remove('d-none');
            paymentSuccess?.classList.add('d-none');
            payButton.innerHTML = 'Pay Now';
            payButton.disabled = false;

            // Mark payment as completed
            this.paymentCompleted = true;
          }, 3000);
        }, 2000);
      });
    }
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
      this.successMessage = 'Booking successful! Details sent to your email.';
      this.isLoading = false;

      setTimeout(() => {
        this.router.navigate(['/patient']);
      }, 4000);
    }, 1500);
  }

  onPaymentChange(method: string) {
    this.paymentMethod = method;
    this.paymentCompleted = false; // Reset when changing method
  }

  onReceiptUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bookingForm.patchValue({ receipt: file });
    }
  }
}