import { CompleteUser, User } from '../../types';
import {
  USER_REQUESTED,
  USER_RECEIVED,
  USER_REJECTED,
  EDIT_USER_REJECTED,
  EDIT_USER_REQUESTED,
  EDIT_USER_RECEIVED
} from '../constants';

import { EditUserPayload } from './';

export interface UserRequestedAction {
  type: typeof USER_REQUESTED;
  payload: number;
}

export interface UserReceivedAction {
  type: typeof USER_RECEIVED;
  payload: CompleteUser;
}

export interface UserRejectedAction {
  type: typeof USER_REJECTED;
  error: string;
}

export interface EditUserRequestedAction {
  type: typeof EDIT_USER_REQUESTED;
  payload: EditUserPayload;
}

export interface EditUserReceivedAction {
  type: typeof EDIT_USER_RECEIVED;
  payload: User;
}

export interface EditUserRejectedAction {
  type: typeof EDIT_USER_REJECTED;
  error: string;
}

export type UserActions =
  | UserRequestedAction
  | UserReceivedAction
  | UserRejectedAction
  | EditUserRequestedAction
  | EditUserReceivedAction
  | EditUserRejectedAction;
