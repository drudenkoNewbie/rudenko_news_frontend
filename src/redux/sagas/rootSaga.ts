import { all } from 'redux-saga/effects';

import { getPostsWatcher } from './getPostsSaga';
import { authWatcher } from './authSaga';
import { verifyWatcher } from './verifyUserSaga';
import { setTokenWatcher } from './setTokenSaga';
import { removeTokenWatcher } from './removeTokenSaga';
import { userWatcher } from './userPageSaga';
import { editUserWatcher } from './editUserSaga';
import { addPostWatcher } from './addPostSaga';

function* rootSaga() {
  yield all([
    getPostsWatcher(),
    authWatcher(),
    verifyWatcher(),
    setTokenWatcher(),
    removeTokenWatcher(),
    userWatcher(),
    editUserWatcher(),
    addPostWatcher()
  ]);
}

export default rootSaga;
