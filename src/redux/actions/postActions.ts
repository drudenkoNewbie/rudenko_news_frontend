import { CompletePost } from '../../types';
import { POSTS_ACTIONS } from '../constants';

export const createPostsRequested = () => ({ type: POSTS_ACTIONS.POSTS_REQUESTED });

export const createPostsReceived = (payload: CompletePost[]) => ({
  type: POSTS_ACTIONS.POSTS_RECEIVED,
  payload
});

export const createPostsFailed = (error: string) => ({
  type: POSTS_ACTIONS.POSTS_FAILED,
  error
});
