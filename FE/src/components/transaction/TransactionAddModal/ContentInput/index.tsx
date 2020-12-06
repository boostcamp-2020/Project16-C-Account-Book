import React from 'react';

import './index.scss';

const ContentInput = ({ onContentChange }) => {
  return (
    <div className="item memo__input">
      <div className="indicator">메모</div>
      <input type="text" name="memo" onChange={onContentChange} />
    </div>
  );
};

export default ContentInput;
