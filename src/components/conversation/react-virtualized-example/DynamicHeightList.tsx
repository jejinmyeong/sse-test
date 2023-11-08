import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CellMeasurer,
  CellMeasurerCache,
  Index,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps,
} from 'react-virtualized';
import { ReducerType } from '../../../store/rootReducer';
import { AppThunkDispatch } from '../../../store/store';
import { getPrevConversationAsyncThunk } from '../../../store/thunk/conversationAsyncThunk';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 50,
  defaultHeight: 500,
});

interface DynamicheightListProps {
  height: number;
  width: number;
}

const DynamicHeightList = React.memo(({ height, width }: DynamicheightListProps) => {
  const { prevConversationList, isEnd, nextOffset, isLoading } = useSelector(
    (state: ReducerType) => state.conversation,
  );
  const infinityLoaderRef = useRef<InfiniteLoader>(null);
  const listRef = useRef<List>(null);

  const rowRenderer = ({ index, parent, style, key }: ListRowProps) => {
    if (!isRowLoaded({ index })) {
      return <div key={index}>loading...</div>;
    } else {
      const datum = prevConversationList[index];
      // console.log(index);
      return (
        <CellMeasurer cache={cache} columnIndex={0} key={datum.id} rowIndex={index} parent={parent}>
          <div key={key} style={{ ...style, transform: `scaleY(-1)` }}>
            {datum.content}
          </div>
        </CellMeasurer>
      );
    }
  };

  const rowCount = useMemo(
    () => (!isEnd ? prevConversationList.length + 1 : prevConversationList.length),
    [isEnd, prevConversationList],
  );

  const isRowLoaded = ({ index }: Index) => {
    // console.log(index);
    return index < prevConversationList.length;
  };

  const dispatch = useDispatch<AppThunkDispatch>();

  const loadMoreRows = async ({ startIndex, stopIndex }: IndexRange) => {
    if (isLoading) {
      dispatch(
        getPrevConversationAsyncThunk({ conversationId: 'test', offset: nextOffset, limit: 50 }),
      );
    }
  };

  const scrollToBottom = () => {
    listRef.current?.scrollToRow(0);
  };

  return (
    <InfiniteLoader
      ref={infinityLoaderRef}
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      threshold={1}
    >
      {({ onRowsRendered, registerChild }) => {
        return (
          <>
            <List
              style={{ transform: `scaleY(-1)` }}
              ref={listRef}
              deferredMeasurementCache={cache}
              // overscanRowCount={0}
              rowCount={rowCount}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              height={height}
              width={width}
              onRowsRendered={onRowsRendered}
            />
            <button
              onClick={scrollToBottom}
              style={{ position: 'fixed', bottom: '5rem', right: '2rem' }}
            >
              bottom
            </button>
          </>
        );
      }}
    </InfiniteLoader>
  );
});

export default DynamicHeightList;
