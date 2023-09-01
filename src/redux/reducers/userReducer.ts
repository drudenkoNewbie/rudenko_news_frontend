import { CompleteUser } from '../../types';
import { USER_ACTIONS } from '../constants';
import { UserAction, UserState } from '../types';

const initialState: UserState = {
  user: null,
  isUserFetching: false,
  userError: ''
};

export default function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case USER_ACTIONS.USER_REQUESTED:
      return {
        ...state,
        isUserFetching: true
      };
    case USER_ACTIONS.USER_RECEIVED:
      return {
        ...state,
        user: action.payload as CompleteUser,
        isUserFetching: false
      };
    case USER_ACTIONS.USER_REJECTED:
      return {
        ...state,
        isUserFetching: false
      };
    default:
      return state;
  }
}
