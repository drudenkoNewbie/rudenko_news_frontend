import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { createPostsFailed, createPostsReceived } from '../actions/postActions';
import { POSTS_ACTIONS } from '../constants';
import { getPosts } from '../api/getPosts';

function* postsWorker() {
  try {
    const { data } = yield call(getPosts);

    yield put(createPostsReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createPostsFailed(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* postsWatcher() {
  yield takeLatest(POSTS_ACTIONS.POSTS_REQUESTED, postsWorker);
}
