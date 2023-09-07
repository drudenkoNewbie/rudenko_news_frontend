import { call, takeLatest } from 'redux-saga/effects';

import { removeLSToken } from '../../lib/local-storage';
import { AUTH_SIGN_OUT } from '../constants';

function* removeTokenWorker() {
  yield call(removeLSToken);
}

export function* removeTokenWatcher() {
  yield takeLatest(AUTH_SIGN_OUT, removeTokenWorker);
}
