import { IPost } from "../../types/post/post"
import { POSTS_ACTIONS } from "../constants"

export const createRequested = () => ({
  type: POSTS_ACTIONS.REQUESTED, 
});

export const createReceived = (payload: IPost[]) => ({
  type: typeof POSTS_ACTIONS.RECEIVED,
  payload,
})

export const createFailed  = (error: string) => ({
  type: typeof POSTS_ACTIONS.FAILED,
  error,
})

export interface IPostsState {
  news: IPost[] | undefined,
  isLoading: boolean,
  error: null | string | undefined,
}
