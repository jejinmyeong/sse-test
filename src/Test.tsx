import React, { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from './store/store';
import { getPrevConversationAsyncThunk } from './store/thunk/conversationAsyncThunk';
import { ReducerType } from './store/rootReducer';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { MessageDTO } from './store/modules/conversationSlice';

const END_INDEX = 200000;

const Test = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { prevConversationList, nextOffset, isEnd } = useSelector(
    (state: ReducerType) => state.conversation,
  );
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [firstItemIndex, setFirstItemIndex] = useState(END_INDEX - prevConversationList.length);

  const internalMessages = useMemo(() => {
    const nextFirstItemIndex = END_INDEX - prevConversationList.length;

    setFirstItemIndex(() => nextFirstItemIndex);

    return prevConversationList;
  }, [prevConversationList]);

  useEffect(() => {
    dispatch(
      getPrevConversationAsyncThunk({ conversationId: 'conversation-1', offset: 0, limit: 100 }),
    );
  }, []);

  const itemContent = useCallback(
    (index: number, data: MessageDTO) => {
      return <div key={data.id}>{data.content}</div>;
    },
    [prevConversationList],
  );

  useEffect(() => {
    console.log(listRef.current?.offsetHeight);
  });

  const moreLoad = useCallback(() => {
    if (isEnd) return;
    dispatch(
      getPrevConversationAsyncThunk({
        conversationId: 'conversation-1',
        offset: nextOffset,
        limit: 50,
      }),
    );
  }, [nextOffset, isEnd]);

  const Header = () => {
    return <div>더 읽어오는 중</div>;
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }} ref={listRef}>
      <Virtuoso
        ref={virtuosoRef}
        // scrollerRef={(ref) => console.log(ref)}
        // rangeChanged={(range) => console.log(range)}
        increaseViewportBy={{ top: 5000, bottom: 5000 }}
        // isScrolling={(isScroll) => console.log(isScroll)}
        // totalCount={data.length}
        initialTopMostItemIndex={prevConversationList.length - 1}
        firstItemIndex={firstItemIndex}
        startReached={moreLoad}
        initialItemCount={0}
        customScrollParent={listRef.current ?? undefined}
        data={internalMessages}
        itemContent={itemContent}
        components={{
          Header: Header,
        }}
      />
      <div style={{ height: 200 }}>footer</div>
    </div>
  );
  // return <div>{data && data.map((text, idx) => <div key={idx}>{text.content}</div>)}</div>;
};

export default Test;
