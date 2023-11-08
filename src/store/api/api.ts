import axios from 'axios';
import { MessageDTO } from '../modules/conversationSlice';

const instance = axios.create();

interface PrevConversationResponseDTO {
  prevConversationList: MessageDTO[];
  offset: number;
  isEnd: boolean;
}

export const getPrevConversation = async (conversationId: string, offset: number, limit = 10) => {
  try {
    return (
      await instance.get<PrevConversationResponseDTO>(
        `http://localhost:8080/conversations/${conversationId}/messages?offset=${offset}&limit=${limit}`,
      )
    ).data;
  } catch (e) {
    console.error(e);
  }
};
