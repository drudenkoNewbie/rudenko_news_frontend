import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';

export const rootReducer = combineReducers({ news: postsReducer, modal: modalReducer, auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;
