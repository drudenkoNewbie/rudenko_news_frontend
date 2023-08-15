import { IPostsState, PostAction } from '../actions/postActions';
import { POSTS_ACTIONS } from '../constants';

const initialState: IPostsState = {
  news: [],
  isLoading: false,
  error: null,
};

export default function newsReducer(state = initialState, action: PostAction): IPostsState {
 switch (action.type) {
   case POSTS_ACTIONS.REQUESTED:
     return {
       ...state,
       isLoading: true,
       error: null,
     };
   case POSTS_ACTIONS.RECEIVED:
     return {
       ...state,
       isLoading: false,
       news: action.payload,
       error: null,
     };
   case POSTS_ACTIONS.FAILED:
     return {
       ...state,
       isLoading: false,
       news: [],
       error: action.error,
     };
   default: return state;
 }
}
