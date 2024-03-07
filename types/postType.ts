export interface postType {
  id: string;
  content: string;
  tag: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}