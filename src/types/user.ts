export interface IUser {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
