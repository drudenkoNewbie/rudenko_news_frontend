import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState } from '../reducers/rootReducer';
import { AppDispatch } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch
