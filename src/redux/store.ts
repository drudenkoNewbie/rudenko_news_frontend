import { legacy_createStore as createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';
import { rootReducer } from './reducers/rootReducer';

// window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose ||

const composeEnchanters = compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnchanters(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
