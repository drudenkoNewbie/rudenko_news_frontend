import { CompletePost } from '../../types';
import { POSTS_RECEIVED, POSTS_REJECTED, POSTS_REQUESTED } from '../constants';
import {
  PostsReceivedAction,
  PostsRejectedAction,
  PostsRequestedAction
} from '../types/postsActions';

export const createPostsRequested = (): PostsRequestedAction => ({
  type: POSTS_REQUESTED
});

export const createPostsReceived = (
  payload: CompletePost[]
): PostsReceivedAction => ({
  type: POSTS_RECEIVED,
  payload
});

export const createPostsRejected = (error: string): PostsRejectedAction => ({
  type: POSTS_REJECTED,
  error
});
