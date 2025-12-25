import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
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
      paymentMethod: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.isLoading = true;

    // Simulate registration
    setTimeout(() => {
      console.log('Patient Registered:', this.registerForm.value);
      this.isLoading = false;
      // Redirect to login or dashboard
      // this.router.navigate(['/patient/login']);
    }, 2000);
  }
}