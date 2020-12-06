import React from 'react';

import './index.scss';

const PriceInput = ({ onPriceChange }) => {
  return (
    <div className="item price__input">
      <div className="indicator">금액</div>
      <label>
        <input type="number" name="price" onChange={onPriceChange} />
      </label>
    </div>
  );
};

export default PriceInput;
