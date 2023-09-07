import { call, takeLatest } from 'redux-saga/effects';

import { AUTH_SUCCEED } from '../constants';
import { setLSToken } from '../../lib/local-storage';
import { AuthReceivedAction } from '../types/authActions';

function* setTokenWorker({ payload }: AuthReceivedAction) {
  yield call(setLSToken, payload.token);
}

export function* setTokenWatcher() {
  yield takeLatest(AUTH_SUCCEED, setTokenWorker);
}
