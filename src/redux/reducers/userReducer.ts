import { USER_REQUESTED, USER_RECEIVED, USER_REJECTED } from '../constants';
import { UserState } from '../types';
import { UserActions } from '../types/userActions';

const initialState: UserState = {
  user: null,
  isUserFetching: false,
  userError: ''
};

export default function userReducer(
  state = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case USER_REQUESTED:
      return {
        ...state,
        isUserFetching: true
      };
    case USER_RECEIVED:
      return {
        ...state,
        user: action.payload,
        isUserFetching: false
      };
    case USER_REJECTED:
      return {
        ...state,
        isUserFetching: false
      };
    default:
      return state;
  }
}
