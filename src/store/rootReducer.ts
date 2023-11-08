import { combineReducers } from '@reduxjs/toolkit';
import conversation from './modules/conversationSlice';

const reducer = combineReducers({
  conversation,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
