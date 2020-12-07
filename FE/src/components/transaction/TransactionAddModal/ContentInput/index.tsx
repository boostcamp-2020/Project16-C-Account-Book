import React, { ChangeEvent } from 'react';

import './index.scss';

const ContentInput = ({ setContent }) => {
  const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLInputElement;
      setContent(targetElement.value);
    }
  };

  return (
    <div className="item memo__input">
      <div className="indicator">메모</div>
      <input type="text" name="memo" onChange={onContentChange} />
    </div>
  );
};

export default ContentInput;
