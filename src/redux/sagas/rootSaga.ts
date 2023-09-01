import { all } from 'redux-saga/effects';

import { postsWatcher } from './postsSaga';
import { authWatcher } from './authSaga';
import { verifyWatcher } from './verifyUserSaga';
import { setTokenWatcher } from './setTokenSaga';
import { removeTokenWatcher } from './removeTokenSaga';
import { userWatcher } from './userPageSaga';

function* rootSaga() {
  yield all([
    postsWatcher(),
    authWatcher(),
    verifyWatcher(),
    setTokenWatcher(),
    removeTokenWatcher(),
    userWatcher()
  ]);
}

export default rootSaga;
