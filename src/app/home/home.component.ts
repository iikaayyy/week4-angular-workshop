import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <h2>Home</h2>
      <p>Welcome! Click Login to continue.</p>
      <a class="btn btn-primary" routerLink="/login">Go to Login</a>
    </div>
  `
})
export class HomeComponent {}
