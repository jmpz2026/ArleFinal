import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

// Se ejecuta en cada petición HTTP: registra método, URL y tiempo de respuesta
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  const inicio = Date.now();

  return next(req).pipe(
    tap({
      // next() recibe varios eventos (ej. "petición enviada"); solo registramos la respuesta final
      next: (evento) => {
        if (evento.type === HttpEventType.Response) {
          console.log(`✅ ${evento.status} ${req.url} — ${Date.now() - inicio}ms`);
        }
      },
      error: (err) => console.error(`❌ ${req.url}`, err)
    })
  );
};
