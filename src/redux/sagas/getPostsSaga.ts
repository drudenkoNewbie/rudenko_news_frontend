import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import {
  createPostsRejected,
  createPostsReceived
} from '../actions/postActions';
import { getPosts } from '../api/getPosts';
import { POSTS_REQUESTED } from '../constants';

function* getPostsWorker() {
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

export function* getPostsWatcher() {
  yield takeLatest(POSTS_REQUESTED, getPostsWorker);
}
