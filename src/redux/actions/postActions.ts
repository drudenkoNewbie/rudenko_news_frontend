import { Post } from '../../types/post/post';
import { POSTS_ACTIONS } from '../constants';

interface Requested {
  type: POSTS_ACTIONS.REQUESTED
}

interface Received {
  type: POSTS_ACTIONS.RECEIVED,
  payload: Post[]
}

interface Failed {
  type: POSTS_ACTIONS.FAILED,
  error: string,
}

export const createRequested = (): Requested => ({ type: POSTS_ACTIONS.REQUESTED, });

export const createReceived = (payload: Post[]): Received => ({ type: POSTS_ACTIONS.RECEIVED, payload, });

export const createFailed = (error: string): Failed => ({
  type: POSTS_ACTIONS.FAILED,
  error, 
});

export type PostAction = Requested | Received | Failed;

export interface PostsState {
  news: Post[] | null,
  isLoading: boolean,
  error: null | string,
}
