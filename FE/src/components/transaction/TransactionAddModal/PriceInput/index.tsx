import React from 'react';

import './index.scss';

const PriceInput = () => {
  return (
    <div className="item price__input">
      <div className="indicator">금액</div>
      <label>
        <input type="number" name="price" />
      </label>
    </div>
  );
};

export default PriceInput;
