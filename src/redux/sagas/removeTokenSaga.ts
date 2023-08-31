import { call, takeLatest } from 'redux-saga/effects';

import { AUTH_ACTIONS } from '../constants';
import { removeLSToken } from '../../lib/local-storage';

function* removeTokenWorker() {
  yield call(removeLSToken);
}

export function* removeTokenWatcher() {
  yield takeLatest(AUTH_ACTIONS.AUTH_SIGN_OUT, removeTokenWorker);
}
