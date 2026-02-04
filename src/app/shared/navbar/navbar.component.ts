import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Simulate logged-in user (replace with real auth service later)
  isLoggedIn = false; // Change to true for testing
  userName = 'John Doe'; // Replace with real user name
}