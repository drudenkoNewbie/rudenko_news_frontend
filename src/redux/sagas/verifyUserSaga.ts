import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { AUTH_VERIFY_REQUESTED } from '../constants';
import { verifyUser } from '../api/authUser';
import {
  createVerifyReceived,
  createVerifyRejected
} from '../actions/verifyUserActions';

function* verifyWorker() {
  try {
    const { data } = yield call(verifyUser);

    yield put(createVerifyReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createVerifyRejected(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* verifyWatcher() {
  yield takeLatest(AUTH_VERIFY_REQUESTED, verifyWorker);
}
