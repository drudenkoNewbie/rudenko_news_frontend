import { User } from '../../types';
import { AUTH_ACTIONS } from '../constants';

export const createVerifyRequested = () => ({ type: AUTH_ACTIONS.AUTH_REQUESTED });

export const createVerifyReceived = (payload: User) => ({
  type: AUTH_ACTIONS.AUTH_SUCCEED,
  payload
});

export const createVerifyFailed = (error: string) => ({
  type: AUTH_ACTIONS.AUTH_FAILED,
  error
});
