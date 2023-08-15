import { ITag } from '../tag';
import { IUser } from '../user';

export interface IPost {
  id: number;
  authorId: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  tags: ITag[];
}