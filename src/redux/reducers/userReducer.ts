import {
  USER_REQUESTED,
  USER_RECEIVED,
  USER_REJECTED,
  EDIT_USER_REQUESTED,
  EDIT_USER_RECEIVED,
  EDIT_USER_REJECTED,
  ADD_POST_REQUESTED,
  ADD_POST_REJECTED,
  ADD_POST_RECEIVED
} from '../constants';
import { UserState } from '../types';
import { AddPostActions } from '../types/addPostActions';
import { UserActions } from '../types/userActions';

const initialState: UserState = {
  user: null,
  isUserFetching: false,
  isEditUserFetching: false,
  isAddPostFetching: false,
  userError: null
};

export default function userReducer(
  state = initialState,
  action: UserActions | AddPostActions
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
    case ADD_POST_REQUESTED:
      return {
        ...state,
        isAddPostFetching: true
      };
    case USER_RECEIVED:
      return {
        ...state,
        user: action.payload,
        isUserFetching: false,
        userError: null
      };
    case EDIT_USER_RECEIVED:
      return {
        ...state,
        user: { ...state.user!, ...action.payload },
        isEditUserFetching: false,
        userError: null
      };
    case ADD_POST_RECEIVED:
      return {
        ...state,
        isAddPostFetching: false,
        user: {
          ...state.user!,
          posts: [...state.user!.posts, action.payload]
        },
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
    case ADD_POST_REJECTED:
      return {
        ...state,
        isAddPostFetching: false,
        userError: action.error
      };
    default:
      return state;
  }
}
