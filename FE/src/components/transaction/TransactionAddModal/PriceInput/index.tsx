import React, { ChangeEvent, RefObject, useRef } from 'react';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';
import CommaMaker from '../../../../util/commaForMoney';

import './index.scss';

const PriceInput = ({
  priceInputElementRef,
}: {
  priceInputElementRef: RefObject<HTMLInputElement>;
}) => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target) {
        const targetElement = e.target as HTMLInputElement;
        setInput({ ...input, cost: +targetElement.value.replace(/,/gi, '') });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="item price__input__container">
      <div className="indicator">금액</div>
      <div className="price__input">
        <input
          ref={priceInputElementRef}
          id="price__input"
          type="text"
          name="price"
          onChange={onPriceChange}
          min="1"
          value={
            input.cost ? CommaMaker(String(input.cost).replace(/,/gi, '')) : ''
          }
        />
      </div>
    </div>
  );
};

export default PriceInput;
