import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  news: postsReducer,
  modal: modalReducer,
  auth: authReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
