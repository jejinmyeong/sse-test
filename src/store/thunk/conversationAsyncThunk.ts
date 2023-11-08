import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPrevConversation } from '../api/api';

type requestDTO = {
  conversationId: string;
  offset: number;
  limit: number;
};

export const getPrevConversationAsyncThunk = createAsyncThunk(
  'conversation/sse',
  async ({ conversationId, offset, limit }: requestDTO, { rejectWithValue }) => {
    try {
      return getPrevConversation(conversationId, offset, limit);
    } catch (err) {
      console.error(err);
    }
  },
);
