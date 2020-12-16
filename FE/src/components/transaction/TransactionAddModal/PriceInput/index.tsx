import React, { ChangeEvent, useRef } from 'react';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';
import CommaMaker from '../../../../util/commaForMoney';

import './index.scss';

const PriceInput = () => {
  const inputLabel = useRef(null);

  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target) {
        const targetElement = e.target as HTMLInputElement;
        setInput({ ...input, cost: +targetElement.value });
        if (!inputLabel.current) throw new Error('label is null');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="item price__input__container">
      <div className="indicator">금액</div>
      <div className="price__input">
        <label ref={inputLabel} htmlFor="price__input">
          {input.cost ? `₩ ${CommaMaker(
          +input.cost,
        )}` : '₩ 0'}
        </label>
        <input
          id="price__input"
          type="number"
          name="price"
          onChange={onPriceChange}
          min="1"
          value={!!input.cost && input.cost}
        />
      </div>
    </div>
  );
};

export default PriceInput;
