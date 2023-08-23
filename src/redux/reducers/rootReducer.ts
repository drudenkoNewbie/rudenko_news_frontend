import { combineReducers } from 'redux';

import postsReducer from './postsReducer';

export const rootReducer = combineReducers({ news: postsReducer });

export type RootState = ReturnType<typeof rootReducer>;
