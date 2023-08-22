interface Post {
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