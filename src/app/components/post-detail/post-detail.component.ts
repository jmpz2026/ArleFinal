import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';

// Reto del laboratorio final: muestra un post junto a sus comentarios
@Component({
  selector: 'app-post-detail',
  imports: [RouterLink],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private commentService = inject(CommentService);

  post = signal<Post | null>(null);
  comentarios = signal<Comment[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // forkJoin lanza las dos peticiones en paralelo y espera a que ambas terminen
    forkJoin({
      post: this.postService.getPost(id),
      comentarios: this.commentService.getComments(id)
    }).subscribe({
      next: ({ post, comentarios }) => {
        this.post.set(post);
        this.comentarios.set(comentarios);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.cargando.set(false);
      }
    });
  }
}
