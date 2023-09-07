import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import {
  createPostsRejected,
  createPostsReceived
} from '../actions/postActions';
import { getPosts } from '../api/getPosts';
import { POSTS_REQUESTED } from '../constants';

function* postsWorker() {
  try {
    const { data } = yield call(getPosts);

    yield put(createPostsReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createPostsRejected(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* postsWatcher() {
  yield takeLatest(POSTS_REQUESTED, postsWorker);
}
