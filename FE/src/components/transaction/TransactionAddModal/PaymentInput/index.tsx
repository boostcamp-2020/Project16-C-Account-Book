import React from 'react';

import './index.scss';

const PaymentInput = () => {
  return (
    <div className="item payment__input">
      <div className="indicator">결제수단</div>
      <div className="payment__card__container">
        <label className="payment__card__item">
          <input type="radio" name="payment" />
          <div className="payment__card__view">
            <div className="payment__card__title">a</div>
            <div className="payment__card__description">description</div>
          </div>
        </label>
        <label className="payment__card__item">
          <input type="radio" name="payment" />
          <div className="payment__card__view">
            <div className="payment__card__title">a</div>
            <div className="payment__card__description">description</div>
          </div>
        </label>
        <label className="payment__card__item">
          <input type="radio" name="payment" />
          <div className="payment__card__view">
            <div className="payment__card__title">a</div>
            <div className="payment__card__description">description</div>
          </div>
        </label>
        <label className="payment__card__item">
          <input type="radio" name="payment" />
          <div className="payment__card__view">
            <div className="payment__card__title">a</div>
            <div className="payment__card__description">description</div>
          </div>
        </label>
        <label className="payment__card__item">
          <input type="radio" name="payment" />
          <div className="payment__card__view">
            <div className="payment__card__title">a</div>
            <div className="payment__card__description">description</div>
          </div>
        </label>
        <label className="payment__card__item">
          <input type="radio" name="payment" />
          <div className="payment__card__view">
            <div className="payment__card__title">a</div>
            <div className="payment__card__description">description</div>
          </div>
        </label>
        <label className="payment__card__item">
          <input type="radio" name="payment" />
          <div className="payment__card__view">
            <div className="payment__card__title">a</div>
            <div className="payment__card__description">description</div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentInput;
