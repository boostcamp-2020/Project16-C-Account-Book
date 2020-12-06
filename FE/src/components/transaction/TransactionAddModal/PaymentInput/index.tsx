import React from 'react';

import './index.scss';

const PaymentInput = ({ paymentPool, onPaymentChange }) => {
  return (
    <div className="item payment__input">
      <div className="indicator">결제수단</div>
      <div className="payment__card__container">
        {paymentPool.length ? (
          paymentPool.map(({ name, desc }) => (
            <label className="payment__card__item">
              <input
                type="radio"
                name="payment"
                data-name={name}
                data-description={desc}
                onClick={onPaymentChange}
              />
              <div className="payment__card__view">
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
