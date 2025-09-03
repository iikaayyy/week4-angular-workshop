import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponse {
  username: string;
  birthdate: string;
  age: number;
  email: string;
  valid: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  isSubmitting = false;

  login() {
    this.errorMessage = '';
    this.isSubmitting = true;

    this.http.post<AuthResponse>('http://localhost:3000/api/auth', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (res?.valid) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.email = '';
          this.password = '';
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: () => {
        this.errorMessage = 'Login service unavailable. Is the Node server running on :3000?';
      },
      complete: () => this.isSubmitting = false
    });
  }
}
