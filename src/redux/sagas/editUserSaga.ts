import { AxiosError } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { createChangeModal } from '../actions/modalActions';
import { editUser } from '../api/editUser';
import { EditUserRequestedAction } from '../types/userActions';
import { createEditUserReceived, createEditUserRejected } from '../actions/userActions';
import { EDIT_USER_REQUESTED } from '../constants';
import { createVerifyReceived } from '../actions/verifyUserActions';
import { RootState } from '../reducers/rootReducer';

function* editUserWorker({ payload }: EditUserRequestedAction) {
  try {
    const { data } = yield call(editUser, payload);
    const { authUser } = yield select((state: RootState) => state.auth);
    const { user } = yield select((state: RootState) => state.user);
    
    yield put(createEditUserReceived(data));
    if (user.id === authUser.id) yield put(createVerifyReceived(data))
    yield put(createChangeModal({ isOpen: false, modalType: '' }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(
        createEditUserRejected(error.response?.data.message ?? error.message)
      );
    }
  }
}

export function* editUserWatcher() {
  yield takeLatest(EDIT_USER_REQUESTED, editUserWorker);
}
