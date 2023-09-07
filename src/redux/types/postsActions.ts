import { CompletePost } from '../../types';
import { POSTS_REQUESTED, POSTS_RECEIVED, POSTS_REJECTED } from '../constants';

export interface PostsRequestedAction {
  type: typeof POSTS_REQUESTED;
}

export interface PostsReceivedAction {
  type: typeof POSTS_RECEIVED;
  payload: CompletePost[];
}

export interface PostsRejectedAction {
  type: typeof POSTS_REJECTED;
  error: string;
}

export type PostsActions =
  | PostsRequestedAction
  | PostsReceivedAction
  | PostsRejectedAction;
