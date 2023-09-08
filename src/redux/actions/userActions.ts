import { CompleteUser, User } from '../../types';
import { EDIT_USER_RECEIVED, EDIT_USER_REJECTED, EDIT_USER_REQUESTED, USER_RECEIVED, USER_REJECTED, USER_REQUESTED } from '../constants';
import { EditUserPayload } from '../types';
import {
  EditUserReceivedAction,
  EditUserRejectedAction,
  EditUserRequestedAction,
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

export const createEditUserRequested = (payload: EditUserPayload): EditUserRequestedAction => ({
  type: EDIT_USER_REQUESTED,
  payload
});

export const createEditUserReceived = (payload: User): EditUserReceivedAction => ({
  type: EDIT_USER_RECEIVED,
  payload
});

export const createEditUserRejected = (error: string): EditUserRejectedAction => ({
  type: EDIT_USER_REJECTED,
  error
});