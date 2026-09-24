import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

// Un solo componente sirve para crear (/posts/nuevo) y editar (/posts/:id/editar)
@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  postId: number | null = null;
  cargando = signal(false);
  guardando = signal(false);
  error = signal<string | null>(null);

  // El estado del formulario vive en TypeScript, con sus validaciones
  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    body: ['', [Validators.required]]
  });

  ngOnInit(): void {
    // Si la URL trae un id, estamos editando: precargamos el post
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.postId = Number(idParam);
      this.cargando.set(true);
      this.postService.getPost(this.postId).subscribe({
        next: (post) => {
          this.form.patchValue(post);
          this.cargando.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.cargando.set(false);
        }
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) { return; }

    // Objeto tipado con la interfaz Post (sin usar "any")
    const datos: Post = { ...this.form.getRawValue(), userId: 1 };

    const peticion$ = this.postId
      ? this.postService.updatePost(this.postId, datos)
      : this.postService.createPost(datos);

    this.guardando.set(true);
    this.error.set(null);
    peticion$.subscribe({
      next: (respuesta) => {
        const aviso = this.postId
          ? `Publicación ${this.postId} actualizada (respuesta PUT 200).`
          : `Publicación creada con id ${respuesta.id} (respuesta POST 201).`;
        this.router.navigate(['/posts'], { state: { aviso } });
      },
      error: (err) => {
        this.error.set(err.message);
        this.guardando.set(false);
      }
    });
  }
}
