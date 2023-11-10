import { createSlice } from '@reduxjs/toolkit';
import { getPrevConversationAsyncThunk } from '../thunk/conversationAsyncThunk';

export interface MessageDTO {
  id: string;
  type: string;
  content: string;
  created: number;
  finish: boolean;
  conversationId: string;
}

interface ConversationState {
  prevConversationList: MessageDTO[];
  nextOffset: number;
  isEnd: boolean;
  status: string;
  response: Response | undefined;
  isLoading: boolean;
}

const initialState: ConversationState = {
  prevConversationList: [],
  nextOffset: 0,
  isEnd: false,
  status: '',
  response: undefined,
  isLoading: true,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.prevConversationList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPrevConversationAsyncThunk.pending, (state, action) => {
      state.status = 'loading';
      state.isLoading = false;
    });
    builder.addCase(getPrevConversationAsyncThunk.fulfilled, (state, { payload }) => {
      if (payload) {
        state.prevConversationList = [
          ...payload.prevConversationList,
          ...state.prevConversationList,
        ];
        state.nextOffset = payload.offset;
        state.isEnd = payload.isEnd;
      }
      // if (payload) {
      //   state.prevConversationList = [
      //     ...state.prevConversationList,
      //     ...payload.prevConversationList.reverse(),
      //   ];
      //   state.nextOffset = payload.offset;
      //   state.isEnd = payload.isEnd;
      // }
      state.isLoading = true;
    });
  },
});

export default conversationSlice.reducer;
export const conversationActions = conversationSlice.actions;
