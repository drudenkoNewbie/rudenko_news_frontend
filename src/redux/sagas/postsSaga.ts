import { call, put, takeLatest } from "redux-saga/effects"
import { AxiosError } from "axios"

import { createFailed, createReceived, createRequested } from "../actions/postActions"
import { POSTS_ACTIONS } from "../constants"
import  { getPosts } from "../api/getPosts"

function* postsWorker() {
  try {
    console.log(1);
    const { data } = yield call(getPosts);
    yield put(createReceived(data))
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(createFailed((error as AxiosError).message))
    }
  }

}

export function* postsWatcher() {
  yield takeLatest(POSTS_ACTIONS.REQUESTED, postsWorker)
}