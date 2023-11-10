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
  const streamMessageRef = useRef<HTMLDivElement>(null);

  const isAtBottom = useAtBottom({ offset: 0, ref: conversationContainerRef });

  const { startConversation, streamMessage } = useChat();

  // const { height, top } = useResizeObserver({
  //   ref: virtuosoRef,
  //   callback: () => {
  //     console.log('test');
  //   },
  //   isResize: true,
  // });

  const scrollToBottom = () => {
    console.log('callback>>>>');
    // console.log(conversationContainerRef.current?.scrollHeight);
    conversationContainerRef.current?.scrollTo({
      top: conversationContainerRef.current.scrollHeight,
    });
  };

  const { height } = useResizeObserver({
    ref: streamMessageRef,
    callback: scrollToBottom,
    isResize: isAtBottom,
  });

  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(getPrevConversationAsyncThunk({ conversationId: 'test', offset: 0, limit: 50 })).then(
      () =>
        setTimeout(() => {
          scrollToBottom();
        }, 300),
    );
  }, []);

  return (
    <div className="conversation-container" ref={conversationContainerRef}>
      <ConversationList customScrollParent={conversationContainerRef} />
      {/* <VirtualizedConversationList /> */}
      <StreamMessage message={streamMessage} ref={streamMessageRef} />
      <div style={{ height: '12rem' }} />
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
