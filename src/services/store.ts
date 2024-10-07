import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './reducers/RootReducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ConstructorReducer from './reducers/ConstructorReducer';

const store = configureStore({
  reducer: {
    root: RootReducer,
    constructorData: ConstructorReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
