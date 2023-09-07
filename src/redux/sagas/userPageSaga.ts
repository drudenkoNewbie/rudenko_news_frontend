import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { USER_ACTIONS } from '../constants';
import { getUser } from '../api/getUser';
import { UserAction } from '../types';
import { createUserReceived, createUserRejected } from '../actions/userActions';

function* userWorker({ payload }: UserAction) {
  try {
    const { data } = yield call(getUser, payload as number);

    yield put(createUserReceived(data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createUserRejected(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* userWatcher() {
  yield takeLatest(USER_ACTIONS.USER_REQUESTED, userWorker);
}
