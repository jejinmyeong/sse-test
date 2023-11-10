import React from 'react';
import { MessageDTO } from '../../store/modules/conversationSlice';

interface StreamMessageProps {
  message?: MessageDTO;
}

const StreamMessage = React.forwardRef<HTMLDivElement, StreamMessageProps>(({ message }, ref) => {
  return (
    <div ref={ref}>
      <div>{message?.content}</div>
    </div>
  );
});

export default StreamMessage;
