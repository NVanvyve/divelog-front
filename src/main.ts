import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch((error) => console.error(error));
