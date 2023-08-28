import { AxiosError } from 'axios';
import * as Effects from 'redux-saga/effects';

import { AUTH_ACTIONS } from '../constants';
import { createAuthFailed, createAuthReceived } from '../actions/authActions';
import { verifyUser } from '../api/authUser';

const { takeLatest, put } = Effects;
const call: any = Effects.call;

function* verifyWorker() {
  const token = localStorage.getItem('token');
  try {
    const  { data } = yield call(verifyUser, token);
    yield put(createAuthReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(createAuthFailed((error as AxiosError).message));
    }
  }
}

export function* verifyWatcher() {
  yield takeLatest(AUTH_ACTIONS.AUTH_VERIFY_REQUESTED, verifyWorker);
}
