import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaystackService } from 'src/app/core/services/paystack/paystack.service';

declare var bootstrap: any; // Declare bootstrap as global

@Component({
  selector: 'app-ambulance-request',
  templateUrl: './ambulance-request.component.html',
  styleUrls: ['./ambulance-request.component.css'],
})
export class AmbulanceRequestComponent implements AfterViewInit {
  ambulanceForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  paymentMethod = '';
  paymentCompleted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paystackService: PaystackService,
  ) {
    this.ambulanceForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^[+]?[0-9]{10,15}$')],
      ],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      receipt: [null],
    });
  }

  get f() {
    return this.ambulanceForm.controls;
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
    const email =
      this.ambulanceForm.get('fullName')?.value || 'patient@911medic.com';
    const serviceType = this.ambulanceForm.get('type')?.value;

    // Get amount based on service type
    const amount = this.getAmountForService(serviceType);

    // Generate unique reference
    const reference = `911medic-ambulance-${Date.now()}`;

    // Call Paystack service
    this.paystackService.initiatePayment(
      email,
      amount,
      reference,
      (response) => this.onPaymentSuccess(response),
      () => this.onPaymentClose(),
    );
  }

  // Map service type to amount
  getAmountForService(serviceType: string): number {
    const priceMap: { [key: string]: number } = {
      emergency: 25000,
      transfer: 15000,
      event: 20000,
    };
    return priceMap[serviceType] || 15000;
  }

  onPaymentSuccess(response: any) {
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
  }

  onSubmit() {
    this.submitted = true;
    this.ambulanceForm.markAllAsTouched();

    if (this.ambulanceForm.invalid) return;

    // Require Paystack payment completion
    if (this.paymentMethod === 'paystack' && !this.paymentCompleted) {
      this.errorMessage =
        'Please complete the payment using Paystack before submitting.';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.successMessage =
        'Ambulance request successful! Our team will contact you shortly.';
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
    // Clear error messages when changing payment method
    this.errorMessage = '';
  }

  closeSuccess() {
    this.successMessage = '';
  }

  closeError() {
    this.errorMessage = '';
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
      this.ambulanceForm.patchValue({ receipt: file });
    }
  }
}
