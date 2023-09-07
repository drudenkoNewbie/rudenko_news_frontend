import { POSTS_REQUESTED, POSTS_RECEIVED, POSTS_REJECTED } from '../constants';
import { PostsState } from '../types';
import { PostsActions } from '../types/postsActions';

const initialState: PostsState = {
  news: null,
  isLoading: false,
  error: null
};

export default function postsReducer(
  state = initialState,
  action: PostsActions
): PostsState {
  switch (action.type) {
    case POSTS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case POSTS_RECEIVED:
      return {
        isLoading: false,
        news: action.payload,
        error: null
      };
    case POSTS_REJECTED:
      return {
        isLoading: false,
        news: [],
        error: action.error
      };
    default:
      return state;
  }
}
