import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.loginError = null;

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
        this.authService.login(email); // ✅ update login state globally
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = 'Invalid email or password.';
      }
    } else {
      this.loginError = 'Invalid email or password.';
    }
  }
}
