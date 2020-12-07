import React, { ChangeEvent } from 'react';

import './index.scss';

const MessageInput = ({ message, setMessage }) => {
  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLTextAreaElement;
      setMessage(targetElement.value);
    }
  };

  return (
    <div className="item message__input">
      <div className="indicator">메세지로 추가</div>
      <textarea name="message" onChange={onMessageChange} value={message} />
    </div>
  );
};

export default MessageInput;
