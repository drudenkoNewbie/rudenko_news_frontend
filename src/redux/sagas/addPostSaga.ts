import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { createChangeModal } from '../actions/modalActions';
import { ADD_POST_REQUESTED } from '../constants';
import { AddPostRequestedAction } from '../types/addPostActions';
import { addPost } from '../api/addPost';
import {
  createAddPostReceived,
  createAddPostRejected
} from '../actions/addPostActions';

function* addPostWorker({ payload }: AddPostRequestedAction) {
  try {
    const { data } = yield call(addPost, payload);

    yield put(createAddPostReceived(data));
    yield put(createChangeModal({ isOpen: false, modalType: '' }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createAddPostRejected(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* addPostWatcher() {
  yield takeLatest(ADD_POST_REQUESTED, addPostWorker);
}
