import { AxiosError } from 'axios';
import {
  call,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';

import { AUTH_ACTIONS } from '../constants';
import { authUser } from '../api/authUser';
import { createAuthFailed, createAuthReceived } from '../actions/authActions';
import { RootState } from '../reducers/rootReducer';
import { AuthAction } from '../types';
import { createChangeModal } from '../actions/modalActions';
import { AuthUser } from '../../types';

function* authWorker({ payload }: AuthAction) {
  const { modalType } = yield select((state: RootState) => state.modal);
  const route = modalType === 'sign-in' ? 'sign-in' : 'sign-up';

  try {
    const { data } = yield call(authUser, route, payload as AuthUser);

    yield put(createAuthReceived(data));
    yield put(createChangeModal({ isOpen: false, modalType: '' }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createAuthFailed(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* authWatcher() {
  yield takeLatest(AUTH_ACTIONS.AUTH_REQUESTED, authWorker);
}
