import { POSTS_ACTIONS } from '../constants';
import { PostAction, PostsState } from '../types';

const initialState: PostsState = {
  news: null,
  isLoading: false,
  error: null
};

export default function postsReducer(
  state = initialState,
  action: PostAction
): PostsState {
  switch (action.type) {
    case POSTS_ACTIONS.POSTS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case POSTS_ACTIONS.POSTS_RECEIVED:
      return {
        isLoading: false,
        news: action.payload,
        error: null
      };
    case POSTS_ACTIONS.POSTS_FAILED:
      return {
        isLoading: false,
        news: [],
        error: action.error
      };
    default:
      return state;
  }
}
