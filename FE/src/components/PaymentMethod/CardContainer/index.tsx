import React from 'react';
import { v4 } from 'uuid';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import { deletePaymentMethod } from '../../../api/payment-method';
import './cardContainer.scss';

export default React.memo(function CardContainer(): React.ReactElement {
  const accountBookId = useTransactionData(store => store.accountBook._id);
  const paymentMethods = useTransactionData(
    store => store.accountBook.payments,
  );
  const deletePayment = useTransactionData(store => store.deletePaymentMethod);

  const onClickDelete = async event => {
    const res = await deletePaymentMethod({
      accountBookId,
      paymentId: event.target.dataset.cardid,
    });

    deletePayment(event.target.dataset.cardid);
  };

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
          <div className="card__title">{card.name}</div>
          <div className="card__desc">{card.desc}</div>
          <i
            className="fas fa-trash-alt"
            data-cardid={card._id}
            onClick={onClickDelete}
          />
        </div>
      ))}
    </div>
  );
});
