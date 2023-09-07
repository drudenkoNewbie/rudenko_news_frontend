import {
  call,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { AUTH_REQUESTED } from '../constants';
import { authUser } from '../api/authUser';
import { createAuthRejected, createAuthReceived } from '../actions/authActions';
import { RootState } from '../reducers/rootReducer';
import { createChangeModal } from '../actions/modalActions';
import { AuthRequestedAction } from '../types/authActions';

function* authWorker({ payload }: AuthRequestedAction) {
  const { modalType } = yield select((state: RootState) => state.modal);
  const route = modalType === 'sign-in' ? 'sign-in' : 'sign-up';

  try {
    const { data } = yield call(authUser, route, payload);

    yield put(createAuthReceived(data));
    yield put(createChangeModal({ isOpen: false, modalType: '' }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createAuthRejected(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* authWatcher() {
  yield takeLatest(AUTH_REQUESTED, authWorker);
}
