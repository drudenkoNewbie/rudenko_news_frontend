import { combineReducers } from 'redux';

import newsReducer from './postsReducer';

export const rootReducer = combineReducers({
  news: newsReducer,
 });

 export type RootState = ReturnType<typeof rootReducer>
