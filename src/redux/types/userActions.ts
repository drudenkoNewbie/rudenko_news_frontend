import { CompleteUser } from '../../types';
import { USER_REQUESTED, USER_RECEIVED, USER_REJECTED } from '../constants';

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

export type UserActions =
  | UserRequestedAction
  | UserReceivedAction
  | UserRejectedAction;
