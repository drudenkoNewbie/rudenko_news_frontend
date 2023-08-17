import { IPost } from '../../types/post/post';
import { POSTS_ACTIONS } from '../constants';

interface IRequested {
  type: POSTS_ACTIONS.REQUESTED
}

interface IReceived {
  type: POSTS_ACTIONS.RECEIVED,
  payload: IPost[]
}

interface IFailed {
  type: POSTS_ACTIONS.FAILED,
  error: string,
}

export const createRequested = (): IRequested => ({ type: POSTS_ACTIONS.REQUESTED, });

export const createReceived = (payload: IPost[]): IReceived => ({ type: POSTS_ACTIONS.RECEIVED, payload, });

export const createFailed = (error: string): IFailed => ({
  type: POSTS_ACTIONS.FAILED,
  error, 
});

export type PostAction = IRequested | IReceived | IFailed;

export interface IPostsState {
  news: IPost[] | null,
  isLoading: boolean,
  error: null | string,
}
