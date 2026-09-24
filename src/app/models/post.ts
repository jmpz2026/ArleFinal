// Representa exactamente el JSON que devuelve JSONPlaceholder en /posts
export interface Post {
  id?: number;     // opcional: no existe antes de crear el post
  userId: number;
  title: string;
  body: string;
}
