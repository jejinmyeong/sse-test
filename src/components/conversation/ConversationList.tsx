import React, { useState, useEffect, useCallback, useMemo, useRef, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { ReducerType } from '../../store/rootReducer';
import { MessageDTO } from '../../store/modules/conversationSlice';
import { AppThunkDispatch } from '../../store/store';
import { getPrevConversationAsyncThunk } from '../../store/thunk/conversationAsyncThunk';

interface ConversationProps {
  customScrollParent?: RefObject<HTMLDivElement>;
}

const END_INDEX = 200000;

const ConversationList = ({ ...props }: ConversationProps) => {
  const [firstItemIndex, setFirstItemIndex] = useState(END_INDEX);
  const { prevConversationList, nextOffset, isEnd } = useSelector(
    (state: ReducerType) => state.conversation,
  );

  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const internalMessages = useMemo(() => {
    const nextFirstItemIndex = END_INDEX - prevConversationList.length;

    setFirstItemIndex(() => nextFirstItemIndex);

    return prevConversationList;
  }, [prevConversationList]);

  const itemContent = useCallback(
    (index: number, data: MessageDTO) => <div key={data.id}>{data.content}</div>,
    [prevConversationList],
  );

  const dispatch = useDispatch<AppThunkDispatch>();
  const moreLoad = useCallback(() => {
    dispatch(
      getPrevConversationAsyncThunk({ conversationId: 'test', offset: nextOffset, limit: 50 }),
    );
  }, [nextOffset, isEnd]);

  return (
    <Virtuoso
      height={500}
      ref={virtuosoRef}
      customScrollParent={props.customScrollParent?.current ?? undefined}
      firstItemIndex={firstItemIndex}
      data={internalMessages}
      itemContent={itemContent}
      initialTopMostItemIndex={internalMessages.length - 1}
      startReached={moreLoad}
    />
  );
};

export default React.memo(ConversationList);
