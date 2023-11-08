import React, { useState, useEffect, useRef } from 'react';
import ConversationList from '../components/conversation/ConversationList';
import StreamMessage from '../components/conversation/StreamMessage';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../store/store';
import { getPrevConversationAsyncThunk } from '../store/thunk/conversationAsyncThunk';
import './ConversationPage.scss';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { VirtuosoHandle } from 'react-virtuoso';
import { useAtBottom } from '../hooks/useAtBottom';
import useChat from '../hooks/useChat';
import FormField from '../components/common/FormField';
import VirtualizedConversationList from '../components/conversation/react-virtualized-example/VirtualizedConversationList';

const ConversationPage = () => {
  const conversationContainerRef = useRef<HTMLDivElement>(null);

  const isAtBottom = useAtBottom({ offset: 0, ref: conversationContainerRef });

  const { startConversation } = useChat();

  // const { height, top } = useResizeObserver({
  //   ref: virtuosoRef,
  //   callback: () => {
  //     console.log('test');
  //   },
  //   isResize: true,
  // });

  const scrollToBottom = () => {
    conversationContainerRef.current?.scrollTo({
      top: conversationContainerRef.current.scrollHeight,
    });
  };

  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(getPrevConversationAsyncThunk({ conversationId: 'test', offset: 0, limit: 50 }));
  }, []);

  return (
    <div className="conversation-container" ref={conversationContainerRef}>
      {/* <ConversationList customScrollParent={conversationContainerRef} /> */}
      <VirtualizedConversationList />
      <StreamMessage />
      <FormField
        className="conversation-formfield"
        isLoading
        startConversation={startConversation}
      />
      {!isAtBottom && <button onClick={scrollToBottom}>bottom</button>}
    </div>
  );
};

export default ConversationPage;
