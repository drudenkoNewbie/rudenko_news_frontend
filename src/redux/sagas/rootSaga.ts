import { all } from 'redux-saga/effects';

import { postsWatcher } from './postsSaga';
import { authWatcher } from './authSaga';
import { verifyWatcher } from './verifyUserSaga';
import { setTokenWatcher } from './setTokenSaga';
import { removeTokenWatcher } from './removeTokenSaga';

function* rootSaga() {
  yield all([
    postsWatcher(),
    authWatcher(),
    verifyWatcher(),
    setTokenWatcher(),
    removeTokenWatcher()
  ]);
}

export default rootSaga;
