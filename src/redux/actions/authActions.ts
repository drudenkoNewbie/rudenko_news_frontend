import { AuthResponse, AuthUser } from '../../types';
import {
  AUTH_REQUESTED,
  AUTH_SUCCEED,
  AUTH_REJECTED,
  AUTH_SIGN_OUT
} from '../constants';
import {
  AuthRejectedAction,
  AuthReceivedAction,
  AuthRequestedAction,
  AuthSignOutAction
} from '../types/authActions';

export const createAuthRequested = (
  payload: AuthUser
): AuthRequestedAction => ({
  type: AUTH_REQUESTED,
  payload
});

export const createAuthReceived = (
  payload: AuthResponse
): AuthReceivedAction => ({
  type: AUTH_SUCCEED,
  payload
});

export const createAuthRejected = (error: string): AuthRejectedAction => ({
  type: AUTH_REJECTED,
  error
});

export const createAuthSignOut = (): AuthSignOutAction => ({
  type: AUTH_SIGN_OUT
});
