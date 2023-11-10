import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageDTO } from '../store/modules/conversationSlice';
import { v4 as uuidv4 } from 'uuid';

// export interface StreamMessageDTO extends Omit<MessageDTO, 'content'> {
//   content: string[];
// }

const useChat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [streamMessage, setStreamMessage] = useState<MessageDTO>();
  const streamMessageRef = useRef<string[] | null>(null);

  const startConversation = useCallback((input: string) => {
    setIsLoading(false);
    const es = new EventSource(`http://localhost:8080/conversations/test/open?content=${input}`);

    const replyId = uuidv4();
    const createAt = new Date().getTime();

    let responseMessage: MessageDTO = {
      id: replyId,
      created: createAt,
      conversationId: 'test',
      type: 'AI',
      finish: false,
      content: '',
    };

    const listener = (e: MessageEvent) => {
      const object: MessageDTO = JSON.parse(e.data);

      if (object.finish) {
        setIsLoading(true);
        es.close();
      }

      responseMessage = { ...object, content: responseMessage.content + object.content };
      setStreamMessage(() => responseMessage);
    };

    es.onmessage = listener;
  }, []);

  return { startConversation, streamMessage, isLoading };
};

export default useChat;
