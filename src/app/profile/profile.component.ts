import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  username: string;
  email: string;
  birthdate: string;
  age: number;
  valid?: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private router = inject(Router);
  user: User = { username: '', email: '', birthdate: '', age: 0 };

  ngOnInit() {
    const raw = localStorage.getItem('currentUser');
    if (!raw) { this.router.navigate(['/login']); return; }
    this.user = JSON.parse(raw);
  }

  saveProfile() {
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    alert('Profile saved.');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
