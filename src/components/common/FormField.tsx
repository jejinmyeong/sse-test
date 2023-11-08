import React, { useRef, useState } from 'react';
import { useEnterSubmit } from '../../hooks/useEnterSubmit';
import Textarea from 'react-textarea-autosize';
import './FormField.scss';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startConversation: (input: string) => void;
}

const FormField = ({ isLoading, startConversation, ...props }: FormFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');

  const { formRef, onKeyDown } = useEnterSubmit();

  return (
    <div className={props.className}>
      <form
        className="formfield-container"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) {
            return;
          }
          startConversation(input);
          setInput('');
        }}
      >
        <Textarea
          ref={textareaRef}
          tabIndex={0}
          rows={1}
          onKeyDown={onKeyDown}
          onChange={(e) => setInput(() => e.target.value)}
          placeholder="질문할 내용을 입력하세요"
          value={input}
        />
      </form>
      <div className="empty"></div>
    </div>
  );
};

export default FormField;
