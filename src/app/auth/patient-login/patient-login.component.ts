import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage = '';

   // Simulate logged-in user (replace with real auth service later)
  isLoggedIn = false; // Change to true for testing
  userName = 'John Doe'; // Replace with real user name

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => 
      u.fullName.toLowerCase() === this.f['fullName'].value.toLowerCase() &&
      u.email === this.f['email'].value
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/patient']);
    } else {
      this.errorMessage = 'Invalid full name or email.';
      this.isLoading = false;
    }
  }
}