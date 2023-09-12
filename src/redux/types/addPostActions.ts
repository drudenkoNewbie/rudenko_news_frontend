import { CompletePost } from '../../types';
import {
  ADD_POST_REQUESTED,
  ADD_POST_RECEIVED,
  ADD_POST_REJECTED
} from '../constants';

import { AddPostPayload } from './';

export interface AddPostRequestedAction {
  type: typeof ADD_POST_REQUESTED;
  payload: AddPostPayload;
}

export interface AddPostReceivedAction {
  type: typeof ADD_POST_RECEIVED;
  payload: CompletePost;
}

export interface AddPostRejectedAction {
  type: typeof ADD_POST_REJECTED;
  error: string;
}

export type AddPostActions =
  | AddPostRequestedAction
  | AddPostReceivedAction
  | AddPostRejectedAction;
