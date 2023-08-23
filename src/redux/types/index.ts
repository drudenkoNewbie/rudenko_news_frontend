import { Post } from '../../types';

export interface PostsState {
  news: Post[] | null | undefined,
  isLoading: boolean,
  error: null | string | undefined,
}

export interface PostAction {
  type: string,
  payload?: Post[],
  error?: string,
}
