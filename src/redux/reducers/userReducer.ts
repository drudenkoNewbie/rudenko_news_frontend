import {
  USER_REQUESTED,
  USER_RECEIVED,
  USER_REJECTED,
  EDIT_USER_REQUESTED,
  EDIT_USER_RECEIVED,
  EDIT_USER_REJECTED
} from '../constants';
import { UserState } from '../types';
import { UserActions } from '../types/userActions';

const initialState: UserState = {
  user: null,
  isUserFetching: false,
  isEditUserFetching: false,
  userError: null
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
    case EDIT_USER_REQUESTED:
      return {
        ...state,
        isEditUserFetching: true
      };
    case USER_RECEIVED:
      return {
        ...state,
        user: action.payload,
        isUserFetching: false
      };
    case EDIT_USER_RECEIVED:
      return {
        ...state,
        user: { ...state.user!, ...action.payload },
        isEditUserFetching: false,
        userError: null
      };
    case USER_REJECTED:
      return {
        ...state,
        isUserFetching: false,
        userError: action.error
      };
    case EDIT_USER_REJECTED:
      return {
        ...state,
        isEditUserFetching: false,
        userError: action.error
      };
    default:
      return state;
  }
}
