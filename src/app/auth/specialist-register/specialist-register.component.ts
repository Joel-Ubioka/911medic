import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialist-register',
  templateUrl: './specialist-register.component.html',
  styleUrls: ['./specialist-register.component.css']
})
export class SpecialistRegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{10,15}$')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      cv: [null, Validators.required],          // CV upload
      idDocument: [null, Validators.required]   // ID (Driving License or NIN)
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = this.registerForm.value;

    // Check for duplicate email
    const existingSpecialists = JSON.parse(localStorage.getItem('specialists') || '[]');
    if (existingSpecialists.some((s: any) => s.email === formData.email)) {
      this.errorMessage = 'This email is already registered. Please login.';
      this.isLoading = false;
      return;
    }

    // Simulate saving (add files as metadata for demo)
    const specialist = {
      ...formData,
      status: 'pending', // Waiting for approval
      registeredAt: new Date().toISOString()
    };

    existingSpecialists.push(specialist);
    localStorage.setItem('specialists', JSON.stringify(existingSpecialists));

    this.successMessage = 'Registration successful! Your account is pending approval. You will be notified once verified.';
    this.isLoading = false;

    // Redirect to specialist login after 4 seconds
    setTimeout(() => {
      this.router.navigate(['/specialist/login']);
    }, 4000);
  }

  onCVUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ cv: file });
      this.registerForm.get('cv')?.updateValueAndValidity();
    }
  }

  onIDUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ idDocument: file });
      this.registerForm.get('idDocument')?.updateValueAndValidity();
    }
  }
}