// src/app/guards/auth.guard.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If not in the browser yet, don't touch localStorage — send to /login.
  if (!isPlatformBrowser(platformId)) {
    return router.createUrlTree(['/login']);
  }

  try {
    const loggedIn = !!localStorage.getItem('currentUser');
    return loggedIn ? true : router.createUrlTree(['/login']);
  } catch {
    // If localStorage access fails for any reason, redirect to /login.
    return router.createUrlTree(['/login']);
  }
};
