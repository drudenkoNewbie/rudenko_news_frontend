import {
  AUTH_REJECTED,
  AUTH_REQUESTED,
  AUTH_SIGN_OUT,
  AUTH_SUCCEED,
  AUTH_VERIFY_REJECTED,
  AUTH_VERIFY_REQUESTED,
  AUTH_VERIFY_SUCCEED
} from '../constants';
import { AuthState } from '../types';
import { AuthActions } from '../types/authActions';

const initialState: AuthState = {
  authUser: null,
  isAuthLoading: false,
  authError: null
};

export default function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AUTH_REQUESTED:
    case AUTH_VERIFY_REQUESTED:
      return {
        ...state,
        isAuthLoading: true,
        authError: null
      };
    case AUTH_SUCCEED:
      return {
        authUser: action.payload.user,
        isAuthLoading: false,
        authError: null
      };
    case AUTH_VERIFY_SUCCEED:
      return {
        authUser: action.payload,
        isAuthLoading: false,
        authError: null
      };
    case AUTH_REJECTED:
    case AUTH_VERIFY_REJECTED:
      return {
        authUser: null,
        isAuthLoading: false,
        authError: action.error
      };
    case AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
