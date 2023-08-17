import { POSTS_ACTIONS } from '../../redux/constants';
import { IPost } from './post';

export interface IPostAction {
  type: POSTS_ACTIONS,
  payload?: IPost[],
  error?: string,
}
