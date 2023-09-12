import { AddPostPayload } from '../types';
import { AddPostRejectedAction } from '../types/addPostActions';
import {
  ADD_POST_REQUESTED,
  ADD_POST_RECEIVED,
  ADD_POST_REJECTED
} from '../constants';
import { CompletePost } from '../../types';
import {
  AddPostReceivedAction,
  AddPostRequestedAction
} from '../types/addPostActions';

export const createAddPostRequested = (
  payload: AddPostPayload
): AddPostRequestedAction => ({
  type: ADD_POST_REQUESTED,
  payload
});

export const createAddPostReceived = (
  payload: CompletePost
): AddPostReceivedAction => ({
  type: ADD_POST_RECEIVED,
  payload
});

export const createAddPostRejected = (
  error: string
): AddPostRejectedAction => ({
  type: ADD_POST_REJECTED,
  error
});
