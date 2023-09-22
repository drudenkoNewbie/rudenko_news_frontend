import { Tag } from '../../../types';

export interface PostCardProps {
  authorId: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  tags: Tag[];
  author: string | null;
}
