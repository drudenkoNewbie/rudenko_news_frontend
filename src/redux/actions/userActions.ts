import { CompleteUser } from '../../types';
import { USER_ACTIONS } from '../constants';

export const createUserRequested = (payload: number) => ({
  type: USER_ACTIONS.USER_REQUESTED,
  payload
});

export const createUserReceived = (payload: CompleteUser) => ({
  type: USER_ACTIONS.USER_RECEIVED,
  payload
});

export const createUserRejected = (error: string) => ({
  type: USER_ACTIONS.USER_REJECTED,
  error
});
