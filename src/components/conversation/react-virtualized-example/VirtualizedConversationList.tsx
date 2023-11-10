import React from 'react';
import { AutoSizer } from 'react-virtualized';
import DynamicHeightList from './DynamicHeightList';

const VirtualizedConversationList = () => {
  return (
    <AutoSizer>
      {({ height, width }) => <DynamicHeightList width={width} height={height} />}
    </AutoSizer>
  );
};

export default VirtualizedConversationList;
