import React, { ChangeEvent } from 'react';

import './index.scss';

const PriceInput = ({ setPrice }) => {
  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLInputElement;
      setPrice(+targetElement.value);
    }
  };
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
