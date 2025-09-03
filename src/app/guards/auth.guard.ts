import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loggedIn = !!localStorage.getItem('currentUser');
  if (!loggedIn) router.navigate(['/login']);
  return loggedIn;
};
