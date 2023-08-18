import { Tag } from './tag';
import { User } from './user';

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
