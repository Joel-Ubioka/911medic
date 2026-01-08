import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ambulance-request',
  templateUrl: './ambulance-request.component.html',
  styleUrls: ['./ambulance-request.component.css']
})
export class AmbulanceRequestComponent {
  ambulanceForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  paymentMethod = '';

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
      receipt: [null] // Optional
    });
  }

  get f() { return this.ambulanceForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Mark all fields as touched to show validation
    this.ambulanceForm.markAllAsTouched();

    if (this.ambulanceForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Simulate successful submission
    setTimeout(() => {
      this.successMessage = 'Ambulance request successful! Our team will contact you shortly.';
      this.isLoading = false;

      // Redirect to dashboard after 3 seconds
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
      this.ambulanceForm.patchValue({ receipt: file });
    }
  }
}