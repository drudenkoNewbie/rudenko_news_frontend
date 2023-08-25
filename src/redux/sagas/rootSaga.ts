import { all } from 'redux-saga/effects';

import { postsWatcher } from './postsSaga';
import { authWatcher } from './authSaga';

function* rootSaga() {
  yield all([
    postsWatcher(),
    authWatcher()
  ]);
}

export default rootSaga;
