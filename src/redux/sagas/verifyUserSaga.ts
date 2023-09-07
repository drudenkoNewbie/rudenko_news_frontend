import { AxiosError } from 'axios';
import * as Effects from 'redux-saga/effects';

import { AUTH_ACTIONS } from '../constants';
import { createAuthFailed, createAuthReceived } from '../actions/authActions';
import { verifyUser } from '../api/authUser';

const { takeLatest, put, call } = Effects;

function* verifyWorker() {
  try {
    const { data } = yield call(verifyUser);

    yield put(createAuthReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createAuthFailed(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* verifyWatcher() {
  yield takeLatest(AUTH_ACTIONS.AUTH_VERIFY_REQUESTED, verifyWorker);
}
