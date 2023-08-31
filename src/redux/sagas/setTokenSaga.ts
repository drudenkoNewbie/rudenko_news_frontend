import { call, takeLatest } from 'redux-saga/effects';

import { AUTH_ACTIONS } from '../constants';
import { AuthAction } from '../types';
import { setLSToken } from '../../lib/local-storage';

function* setTokenWorker({ payload }: AuthAction) {
  if ('token' in payload) yield call(setLSToken, payload.token);
}

export function* setTokenWatcher() {
  yield takeLatest(AUTH_ACTIONS.AUTH_SUCCEED, setTokenWorker);
}
