import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any; // Declare bootstrap as global

@Component({
  selector: 'app-ambulance-request',
  templateUrl: './ambulance-request.component.html',
  styleUrls: ['./ambulance-request.component.css']
})
export class AmbulanceRequestComponent implements AfterViewInit {
  ambulanceForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  paymentMethod = '';
  paymentCompleted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.ambulanceForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{10,15}$')]],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      receipt: [null]
    });
  }

  get f() { return this.ambulanceForm.controls; }

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

            payButtonContainer?.classList.remove('d-none');
            paymentSuccess?.classList.add('d-none');
            payButton.innerHTML = 'Pay Now';
            payButton.disabled = false;

            this.paymentCompleted = true;
          }, 3000);
        }, 2000);
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.ambulanceForm.markAllAsTouched();

    if (this.ambulanceForm.invalid) return;

    if (this.paymentMethod === 'paystack' && !this.paymentCompleted) {
      alert('Please complete payment using Paystack.');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.successMessage = 'Ambulance request successful! Our team will contact you shortly.';
      this.isLoading = false;

      setTimeout(() => {
        this.router.navigate(['/patient']);
      }, 4000);
    }, 1500);
  }

  onPaymentChange(method: string) {
    this.paymentMethod = method;
    this.paymentCompleted = false;
  }

  onReceiptUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ambulanceForm.patchValue({ receipt: file });
    }
  }
}