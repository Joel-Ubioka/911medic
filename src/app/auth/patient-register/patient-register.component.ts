import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.isLoading = true;

    const userData = this.registerForm.value;

    // Check for duplicate email
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some((u: any) => u.email === userData.email)) {
      alert('This email is already registered. Please login.');
      this.isLoading = false;
      return;
    }

    // Save user (no password)
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    this.isLoading = false;

    // Redirect to login
    this.router.navigate(['/patient/login']);
  }
}