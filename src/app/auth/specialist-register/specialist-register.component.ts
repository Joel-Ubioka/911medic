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

    const formData = this.registerForm.value;

    // Duplicate check (by name for simplicity)
    const existing = JSON.parse(localStorage.getItem('specialists') || '[]');
    if (existing.some((s: any) => s.fullName.toLowerCase() === formData.fullName.toLowerCase())) {
      this.errorMessage = 'This name is already registered. Please login or use a different name.';
      this.isLoading = false;
      return;
    }

    // Save with pending status
    const specialist = {
      ...formData,
      status: 'pending',
      registeredAt: new Date().toISOString()
    };

    existing.push(specialist);
    localStorage.setItem('specialists', JSON.stringify(existing));

    this.successMessage = 'Registration submitted successfully! Your profile is pending approval. We will notify you once verified.';
    this.isLoading = false;

    // Redirect to login after short delay
    setTimeout(() => {
      this.router.navigate(['/specialist/login']);
    }, 4000);
  }

  onCVUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ cv: file });
    }
  }

  onIDUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ idDocument: file });
    }
  }
}