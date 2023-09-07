import { CompleteUser } from '../../types';
import { USER_RECEIVED, USER_REJECTED, USER_REQUESTED } from '../constants';
import {
  UserReceivedAction,
  UserRejectedAction,
  UserRequestedAction
} from '../types/userActions';

export const createUserRequested = (payload: number): UserRequestedAction => ({
  type: USER_REQUESTED,
  payload
});

export const createUserReceived = (
  payload: CompleteUser
): UserReceivedAction => ({
  type: USER_RECEIVED,
  payload
});

export const createUserRejected = (error: string): UserRejectedAction => ({
  type: USER_REJECTED,
  error
});
