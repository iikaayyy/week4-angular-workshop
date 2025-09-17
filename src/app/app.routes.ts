import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },                 // Week 5
  { path: 'login', component: LoginComponent, title: 'Login' },          // Week 5
  { path: 'profile', component: ProfileComponent,                       // Week 5 (protected)
    canActivate: [authGuard],
    title: 'Profile'
  },
  { path: 'chat', component: ChatComponent, title: 'Chat' },             // Week 6
  { path: '**', redirectTo: '' }                                         // fallback
];
