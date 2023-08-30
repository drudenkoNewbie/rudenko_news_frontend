import { AuthResponse } from '../../types';
import { AUTH_ACTIONS } from '../constants';
import { AuthAction, AuthState } from '../types';

const initialState: AuthState = {
  authUser: null,
  isAuthLoading: false,
  authError: null
};

export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_REQUESTED:
    case AUTH_ACTIONS.AUTH_VERIFY_REQUESTED:
      return {
        ...state,
        isAuthLoading: true,
        authError: null
      };
    case AUTH_ACTIONS.AUTH_SUCCEED:
      return {
        authUser: (action.payload as AuthResponse).user || action.payload,
        isAuthLoading: false,
        authError: null
      };
    case AUTH_ACTIONS.AUTH_FAILED:
      return {
        authUser: null,
        isAuthLoading: false,
        authError: action.error
      };
    case AUTH_ACTIONS.AUTH_SIGN_OUT:
      return initialState;
    default: return state;
  }
}
