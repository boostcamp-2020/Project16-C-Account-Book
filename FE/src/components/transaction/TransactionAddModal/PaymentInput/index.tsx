import iPayment from '@interfaces/payment';
import React, { ChangeEvent, ReactElement } from 'react';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

import './index.scss';

const PaymentInput = ({
  paymentPool,
}: {
  paymentPool: iPayment[];
}): ReactElement => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetElement = e.target as HTMLInputElement;
    const newPayment = {
      _id: targetElement.dataset.id,
      name: targetElement.dataset.name,
      desc: targetElement.dataset.description,
      color: targetElement.dataset.color,
    };

    setInput({ ...input, payment: { ...newPayment } });
  };

  return (
    <div className="item payment__input">
      <div className="indicator">결제수단</div>
      <div className="payment__card__container">
        {paymentPool.length ? (
          paymentPool.map(({ _id, name, desc, color }) => (
            <label className="payment__card__item" key={_id}>
              <input
                type="radio"
                name="payment"
                data-name={name}
                data-description={desc}
                data-color={color}
                data-id={_id}
                onChange={onPaymentChange}
                checked={_id === input.payment?._id}
              />
              <div
                className="payment__card__view"
                style={
                  _id === input.payment?._id
                    ? { backgroundColor: color }
                    : undefined
                }
              >
                <div className="payment__card__title">{name}</div>
                <div className="payment__card__description">{desc}</div>
              </div>
            </label>
          ))
        ) : (
          <h3 className="no__payment">결제수단을 설정해주세요.</h3>
        )}
      </div>
    </div>
  );
};

export default PaymentInput;
