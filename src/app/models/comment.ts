// Representa el JSON de /posts/:id/comments (reto del laboratorio final)
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
