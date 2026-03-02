import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialist-login',
  templateUrl: './specialist-login.component.html',
  styleUrls: ['./specialist-login.component.css'],
})
export class SpecialistLoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  // simulate auth state (kept for template parity)
  isLoggedIn = false;
  userName = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      speciality: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // const specialists = JSON.parse(localStorage.getItem('specialists') || '[]');
    // const found = specialists.find(
    //   (s: any) =>
    //     s.fullName.toLowerCase() === this.f['fullName'].value.toLowerCase() &&
    //     s.email === this.f['email'].value &&
    //     (s.speciality ? s.speciality === this.f['speciality'].value : true),
    // );

    // if (!found) {
    //   this.errorMessage =
    //     'Invalid credentials or not registered as a specialist.';
    //   this.isLoading = false;
    //   return;
    // }

    // if (found.status && found.status !== 'approved') {
    //   this.errorMessage =
    //     'Your account is pending approval. You will be notified once approved.';
    //   this.isLoading = false;
    //   return;
    // }

    // Login success
    // localStorage.setItem('currentSpecialist', JSON.stringify(found));
    this.successMessage = 'Login successful! Redirecting to your dashboard...';

    setTimeout(() => {
      this.router.navigate(['/specialist']);
    }, 1500);
  }

  // Close message handlers
  closeSuccess() {
    this.successMessage = '';
  }

  closeError() {
    this.errorMessage = '';
  }
}
