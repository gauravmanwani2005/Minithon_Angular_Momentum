import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Define a simple interface for the user object
interface UserProfile {
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Initialize user as null to handle the case where data is loading or user is not found
  user: UserProfile | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 1. Find out who is logged in from session storage
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');

    if (loggedInUserEmail) {
      // 2. Get that user's full details from local storage
      const userString = localStorage.getItem(loggedInUserEmail);
      if (userString) {
        // 3. Parse the data and assign it to our component's property
        const fullUser = JSON.parse(userString);
        this.user = {
          name: fullUser.name,
          email: fullUser.email
        };
      } else {
        // This case would be rare, but handles data inconsistency
        this.logout();
      }
    } else {
      // 4. If no one is logged in, protect this page by redirecting to login
      alert('You are not logged in. Please log in to view your profile.');
      this.router.navigate(['/login']);
    }
  }

  // Method to get the first initial for the avatar
  get userInitial(): string {
    return this.user ? this.user.name.charAt(0).toUpperCase() : '';
  }

  logout(): void {
    sessionStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    this.router.navigate(['/login']);
  }
}