import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import reducer, { ReducerType } from './rootReducer';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppThunkDispatch = ThunkDispatch<ReducerType, any, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export default store;
