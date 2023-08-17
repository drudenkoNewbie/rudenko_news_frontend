import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { createFailed, createReceived } from '../actions/postActions';
import { POSTS_ACTIONS } from '../constants';
import { getPosts } from '../api/getPosts';

const setTm = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* postsWorker() {
  try {
    yield setTm(2000); // DELETE
    const { data } = yield call(getPosts);
    yield put(createReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(createFailed((error as AxiosError).message));
    }
  }
}

export function* postsWatcher() {
  yield takeLatest(POSTS_ACTIONS.REQUESTED, postsWorker);
}
