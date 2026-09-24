import { Routes } from '@angular/router';

// Cada ruta usa loadComponent: el componente se descarga solo cuando se visita (lazy loading)
export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadComponent: () =>
      import('./components/post-list/post-list.component')
        .then(m => m.PostListComponent)
  },
  {
    path: 'posts/nuevo',
    loadComponent: () =>
      import('./components/post-form/post-form.component')
        .then(m => m.PostFormComponent)
  },
  {
    path: 'posts/:id/editar',
    loadComponent: () =>
      import('./components/post-form/post-form.component')
        .then(m => m.PostFormComponent)
  },
  {
    // Reto del laboratorio final: detalle del post con sus comentarios
    path: 'posts/:id',
    loadComponent: () =>
      import('./components/post-detail/post-detail.component')
        .then(m => m.PostDetailComponent)
  },
  { path: '**', redirectTo: 'posts' }
];
