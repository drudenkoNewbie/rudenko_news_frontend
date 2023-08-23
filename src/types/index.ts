export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: Date;
}

export interface Tag {
  id: number;
  value: string;
}

export interface Post {
  id: number;
  authorId: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  tags: Tag[];
}
