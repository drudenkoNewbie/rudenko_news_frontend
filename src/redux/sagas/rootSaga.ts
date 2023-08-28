import { all } from 'redux-saga/effects';

import { postsWatcher } from './postsSaga';
import { authWatcher } from './authSaga';
import { verifyWatcher } from './verifyUserSaga';

function* rootSaga() {
  yield all([
    postsWatcher(),
    authWatcher(),
    verifyWatcher()
  ]);
}

export default rootSaga;
