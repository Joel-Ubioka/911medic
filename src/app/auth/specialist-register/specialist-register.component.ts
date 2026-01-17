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
      address: ['', [Validators.required, Validators.minLength(5)]],
      cv: [null, Validators.required],
      idDocument: [null, Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate backend signup
    const formData = this.registerForm.value;

    // Duplicate check (email, but since no email, use name as key for demo)
    const existingSpecialists = JSON.parse(localStorage.getItem('specialists') || '[]');
    if (existingSpecialists.some((s: any) => s.fullName === formData.fullName)) {
      this.errorMessage = 'This name is already registered. Please login.';
      this.isLoading = false;
      return;
    }

    // Save with 'pending' status
    const specialist = {
      ...formData,
      status: 'pending',
      registeredAt: new Date().toISOString()
    };

    existingSpecialists.push(specialist);
    localStorage.setItem('specialists', JSON.stringify(existingSpecialists));

    this.successMessage = 'Registration successful! Your account is pending approval. You will be notified once approved.';
    this.isLoading = false;

    // Redirect to login after 4 seconds
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