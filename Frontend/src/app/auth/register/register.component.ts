import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

// Custom Validator for password matching
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  emailExistsError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator }); // Apply custom validator to the form group
  }

  // Helper getter for easy access to form controls in the template
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.emailExistsError = false;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const email = this.registerForm.value.email;

    // Check if user already exists
    if (localStorage.getItem(email)) {
      this.emailExistsError = true;
      return;
    }

    // Prepare user data (omitting confirmPassword)
    const userData = {
      name: this.registerForm.value.name,
      email: email,
      password: this.registerForm.value.password
    };

    // Store user data in local storage
    localStorage.setItem(email, JSON.stringify(userData));

    alert('Registration successful! Please log in.');
    this.router.navigate(['/login']);
  }
}