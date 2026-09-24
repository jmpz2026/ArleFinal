import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Punto de arranque: monta el componente raíz con la configuración global
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
