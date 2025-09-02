import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  users = [
    { email: 'user1@test.com', password: '12345' },
    { email: 'user2@test.com', password: 'abcde' },
    { email: 'user3@test.com', password: 'password' }
  ];

  constructor(private router: Router) {}

  login() {
    const found = this.users.find(
      u => u.email === this.email && u.password === this.password
    );
    if (found) {
      this.errorMessage = '';
      this.router.navigate(['/profile']);  // Navigate to Profile on successful login
    } else {
      this.errorMessage = 'Invalid email or password';  // Show error message
    }
  }
}
