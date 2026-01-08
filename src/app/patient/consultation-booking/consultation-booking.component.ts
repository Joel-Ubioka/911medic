import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultation-booking',
  templateUrl: './consultation-booking.component.html',
  styleUrls: ['./consultation-booking.component.css']
})
export class ConsultationBookingComponent {
  bookingForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  paymentMethod = '';

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
      receipt: [null] // For file upload (bank transfer)
    });
  }

  get f() { return this.bookingForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.bookingForm.invalid) return;

    this.isLoading = true;

    // Simulate submission
    setTimeout(() => {
      this.successMessage = 'Booking successful! Details sent to your email.';
      this.isLoading = false;

      setTimeout(() => {
        this.router.navigate(['/patient']);
      }, 3000);
    }, 1500);
  }

  onPaymentChange(method: string) {
    this.paymentMethod = method;
  }

  onReceiptUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bookingForm.patchValue({ receipt: file });
    }
  }
}