import { POSTS_ACTIONS } from '../../redux/constants';
import { Post } from './post';

export interface PostAction {
  type: POSTS_ACTIONS,
  payload?: Post[],
  error?: string,
}
