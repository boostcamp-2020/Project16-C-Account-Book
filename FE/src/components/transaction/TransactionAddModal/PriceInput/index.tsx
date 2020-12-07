import React, { ChangeEvent } from 'react';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

import './index.scss';

const PriceInput = () => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLInputElement;
      setInput({ ...input, cost: +targetElement.value });
    }
  };
  return (
    <div className="item price__input">
      <div className="indicator">금액</div>
      <label>
        <input
          type="number"
          name="price"
          onChange={onPriceChange}
          value={input.cost}
        />
      </label>
    </div>
  );
};

export default PriceInput;
