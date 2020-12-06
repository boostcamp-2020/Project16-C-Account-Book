import React from 'react';

import './index.scss';

const MemoInput = () => {
  return (
    <div className="item memo__input">
      <div className="indicator">메모</div>
      <input type="text" name="memo" />
    </div>
  );
};

export default MemoInput;
