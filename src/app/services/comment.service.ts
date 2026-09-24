import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Comment } from '../models/comment';

// Reto del laboratorio: mismo patrón que PostService, para los comentarios
@Injectable({ providedIn: 'root' })
export class CommentService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // GET /posts/:id/comments — comentarios de una publicación
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/${postId}/comments`).pipe(
      catchError((error) => {
        console.error('Error al obtener comentarios', error);
        return throwError(() => new Error('No se pudieron cargar los comentarios.'));
      })
    );
  }
}
