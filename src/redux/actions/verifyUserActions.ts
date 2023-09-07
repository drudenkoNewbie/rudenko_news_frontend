import { User } from '../../types';
import {
  AUTH_VERIFY_REQUESTED,
  AUTH_VERIFY_REJECTED,
  AUTH_VERIFY_SUCCEED
} from '../constants';
import {
  AuthVerifyReceivedAction,
  AuthVerifyRejectedAction,
  AuthVerifyRequestedAction
} from '../types/authActions';

export const createVerifyRequested = (): AuthVerifyRequestedAction => ({
  type: AUTH_VERIFY_REQUESTED
});

export const createVerifyReceived = (
  payload: User
): AuthVerifyReceivedAction => ({
  type: AUTH_VERIFY_SUCCEED,
  payload
});

export const createVerifyRejected = (
  error: string
): AuthVerifyRejectedAction => ({
  type: AUTH_VERIFY_REJECTED,
  error
});
