import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Helper getter for easy access to form controls in the template
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.loginError = null; // Reset error on new submission

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const storedUserString = localStorage.getItem(email);

    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      if (storedUser.password === password) {
        alert('Login successful!');
        // Optionally, store login state and navigate
        sessionStorage.setItem('loggedInUser', email);
        this.router.navigate(['/dashboard']); // Navigate to a dashboard or home page
      } else {
        this.loginError = 'Invalid email or password.';
      }
    } else {
      this.loginError = 'Invalid email or password.';
    }
  }
}