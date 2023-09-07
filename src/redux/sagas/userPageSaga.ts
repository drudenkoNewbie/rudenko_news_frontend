import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import { getUser } from '../api/getUser';
import { createUserReceived, createUserRejected } from '../actions/userActions';
import { USER_REQUESTED } from '../constants';
import { UserRequestedAction } from '../types/userActions';

function* getUserByIdWorker({ payload }: UserRequestedAction) {
  try {
    const { data } = yield call(getUser, payload);

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
  yield takeLatest(USER_REQUESTED, getUserByIdWorker);
}
