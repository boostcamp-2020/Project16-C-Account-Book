import React from 'react';

import './index.scss';

const MessageInput = () => {
  return (
    <div className="item message__input">
      <div className="indicator">메세지로 추가</div>
      <textarea name="message" />
    </div>
  );
};

export default MessageInput;
