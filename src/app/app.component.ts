import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // We store auth state in a field (not a getter) so the template
  // doesn't evaluate localStorage during server-render.
  loggedIn = false;

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateLoggedIn();
      // Keep navbar in sync if another tab logs in/out
      window.addEventListener('storage', this.onStorage);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('storage', this.onStorage);
    }
  }

  private onStorage = (e: StorageEvent) => {
    if (e.key === 'currentUser') this.updateLoggedIn();
  };

  private updateLoggedIn(): void {
    this.loggedIn = !!window.localStorage.getItem('currentUser');
  }

  logout(): void {
    if (this.isBrowser) {
      window.localStorage.removeItem('currentUser');
      this.updateLoggedIn();
    }
    this.router.navigate(['/login']);
  }
}
