import { AuthUser, AuthResponse, User } from '../../types';
import {
  AUTH_REQUESTED,
  AUTH_VERIFY_REQUESTED,
  AUTH_SUCCEED,
  AUTH_REJECTED,
  AUTH_SIGN_OUT,
  AUTH_VERIFY_REJECTED,
  AUTH_VERIFY_SUCCEED
} from '../constants';

export interface AuthRequestedAction {
  type: typeof AUTH_REQUESTED;
  payload: AuthUser;
}

export interface AuthReceivedAction {
  type: typeof AUTH_SUCCEED;
  payload: AuthResponse;
}

export interface AuthRejectedAction {
  type: typeof AUTH_REJECTED;
  error: string;
}

export interface AuthSignOutAction {
  type: typeof AUTH_SIGN_OUT;
}

export interface AuthVerifyRequestedAction {
  type: typeof AUTH_VERIFY_REQUESTED;
}

export interface AuthVerifyReceivedAction {
  type: typeof AUTH_VERIFY_SUCCEED;
  payload: User;
}

export interface AuthVerifyRejectedAction {
  type: typeof AUTH_VERIFY_REJECTED;
  error: string;
}

export type AuthActions =
  | AuthRequestedAction
  | AuthVerifyRequestedAction
  | AuthReceivedAction
  | AuthVerifyReceivedAction
  | AuthRejectedAction
  | AuthVerifyRejectedAction
  | AuthSignOutAction;
