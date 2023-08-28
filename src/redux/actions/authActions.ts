import { AuthUser, User } from '../../types';
import { AUTH_ACTIONS } from '../constants';

export const createAuthRequested = (payload: AuthUser) => ({ type: AUTH_ACTIONS.AUTH_REQUESTED, payload });

export const createAuthVerifyRequested = () => ({ type: AUTH_ACTIONS.AUTH_VERIFY_REQUESTED });

export const createAuthSignOut = () => ({ type: AUTH_ACTIONS.AUTH_SIGN_OUT });

export const createAuthReceived = (payload: User) => ({
  type: AUTH_ACTIONS.AUTH_SUCCEED,
  payload
});

export const createAuthFailed = (error: string) => ({
  type: AUTH_ACTIONS.AUTH_FAILED,
  error
});
