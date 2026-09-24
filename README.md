# Cliente API REST — Gestor de Publicaciones (Angular 22)

Proyecto final del Capítulo 7: cliente frontend que consume la API REST pública
[JSONPlaceholder](https://jsonplaceholder.typicode.com) con un CRUD completo de publicaciones
y el detalle de cada una con sus comentarios.

## Requisitos

- Node.js 22.22.3 o superior (o 24.15+)
- npm

## Cómo ejecutarlo

```bash
npm install
npm start
```

Abre `http://localhost:4200`.

## Funcionalidades

| Ruta | Componente | Verbo HTTP |
|------|------------|------------|
| `/posts` | `PostListComponent` — listar y eliminar | GET, DELETE |
| `/posts/nuevo` | `PostFormComponent` — crear | POST |
| `/posts/:id/editar` | `PostFormComponent` — editar | GET, PUT |
| `/posts/:id` | `PostDetailComponent` — detalle + comentarios | GET |

## Tecnologías y conceptos

- Componentes standalone
- Signals (`signal`, `.set()`, `.update()`)
- Control de flujo `@if` / `@for` / `@empty`
- `HttpClient` con `provideHttpClient()` e `inject()`
- Interceptor funcional (`logging.interceptor.ts`)
- Formularios reactivos con validaciones
- Rutas con carga perezosa (`loadComponent`)
- Manejo de estados de carga y error con `catchError`

## Estructura

```
src/app/
├── app.config.ts
├── app.routes.ts
├── app.component.ts / .html
├── models/           post.ts, comment.ts
├── services/         post.service.ts, comment.service.ts
├── interceptors/     logging.interceptor.ts
└── components/       post-list/, post-form/, post-detail/
```

> Nota: JSONPlaceholder simula las respuestas pero no guarda los cambios. Un post creado
> recibe el id 101 y un código 201, pero no aparece al recargar la lista.
