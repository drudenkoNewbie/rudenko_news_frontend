import * as Effects from 'redux-saga/effects';

import { AUTH_ACTIONS } from '../constants';
import { AuthAction } from '../types';
import { setLSToken } from '../../lib/local-storage';

const { takeLatest, call } = Effects;

function* setTokenWorker({ payload }: AuthAction) {
  yield call(setLSToken, payload.token);
}

export function* setTokenWatcher() {
  yield takeLatest(AUTH_ACTIONS.AUTH_SUCCEED, setTokenWorker);
}
