import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from '../models/post';

// Único lugar de la app que habla con la API de posts
@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // GET /posts?_limit=5 — obtener solo 5 publicaciones de prueba
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl, { params: { _limit: 5 } }).pipe(
      catchError((error) => this.manejarError(error, 'No se pudieron cargar las publicaciones.'))
    );
  }

  // GET /posts/:id — obtener un único recurso
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => this.manejarError(error, 'No se pudo cargar la publicación.'))
    );
  }

  // POST /posts — crear un recurso nuevo
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post).pipe(
      catchError((error) => this.manejarError(error, 'No se pudo crear la publicación.'))
    );
  }

  // PUT /posts/:id — reemplazar un recurso existente
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post).pipe(
      catchError((error) => this.manejarError(error, 'No se pudo actualizar la publicación.'))
    );
  }

  // DELETE /posts/:id — eliminar un recurso
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => this.manejarError(error, 'No se pudo eliminar la publicación.'))
    );
  }

  // Registra el error técnico en consola y entrega al componente un mensaje entendible
  private manejarError(error: HttpErrorResponse, mensaje: string): Observable<never> {
    console.error(mensaje, error);
    return throwError(() => new Error(mensaje));
  }
}
