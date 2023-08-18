interface PostsState {
  news: Post[] | null | undefined,
  isLoading: boolean,
  error: null | string | undefined,
}

interface PostAction {
  type: string,
  payload?: Post[],
  error?: string,
}
