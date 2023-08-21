import { POSTS_ACTIONS } from '../constants';

export const createPostsRequested = () => ({ type: POSTS_ACTIONS.REQUESTED });

export const createPostsReceived = (payload: Post[]) => ({ 
  type: POSTS_ACTIONS.RECEIVED,
  payload
});

export const createPostsFailed = (error: string) => ({
  type: POSTS_ACTIONS.FAILED,
  error 
});
