import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Import your routes here

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]  // Provide routes in the app
})
  .catch((err) => console.error(err));
