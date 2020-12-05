import React from 'react';
import { v4 } from 'uuid';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';

import './cardContainer.scss';

export default React.memo(function CardContainer(): React.ReactElement {
  const paymentMethods = useTransactionData(
    store => store.accountBook.payments,
  );

  return (
    <div className="card__container" data-overlay>
      {paymentMethods.map((card, i) => (
        <div
          key={v4()}
          className="card__container__card"
          style={{
            background: `${card.color}`,
            animationDelay: `${i * 0.08}s`,
          }}
        >
          <div className="card__cancel">X</div>
          <div className="card__title">{card.name}</div>
          <div className="card__desc">{card.desc}</div>
        </div>
      ))}
    </div>
  );
});
