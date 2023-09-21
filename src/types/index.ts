export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthUser {
  username: string;
  email: string;
  password: string;
  avatar: File | null;
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
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}

export interface CompletePost extends Post {
  user: User;
}

export interface CompleteUser extends User {
  posts: CompletePost[];
}

export interface TextInputProps {
  name: string;
  initial?: string;
  required?: boolean;
  type?: string;
  label?: string;
  autoComplete?: string;
  isValid?: (value: string) => boolean;
}

export interface FileInputProps {
  name: string;
  initialFileName?: string;
  initialPreviewSrc?: string;
  required?: boolean;
  accept?: string;
  label?: string;
  autoComplete?: string;
  maxSize?: number;
}

export interface FilterParams {
  currentFilter: string;
  currentSearch: string;
  posts: CompletePost[];
  isSelfDisplayed: boolean;
}
