import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);
  private router = inject(Router);

  // Signals: cajas reactivas; al cambiar su valor, la vista se actualiza sola
  posts = signal<Post[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  // Mensaje que envía el formulario al volver (ej. "Publicación creada con id 101")
  aviso = signal<string | null>(this.router.currentNavigation()?.extras.state?.['aviso'] ?? null);

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.cargando.set(false);
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta publicación?')) { return; }

    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts.update(lista => lista.filter(p => p.id !== id));
        this.aviso.set(`Publicación ${id} eliminada (respuesta DELETE 200).`);
      },
      error: (err) => this.error.set(err.message)
    });
  }
}
