import React from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import {
  updatePaymentMethod,
  deletePaymentMethod,
} from '../../../api/payment-method';
import './cardContainer.scss';

export default React.memo(function CardContainer(): React.ReactElement {
  const accountBookId = useTransactionData(store => store.accountBook._id);
  const paymentMethods = useTransactionData(
    store => store.accountBook.payments,
  );
  const updatePayment = useTransactionData(store => store.updatePaymentMethod);
  const deletePayment = useTransactionData(store => store.deletePaymentMethod);

  const onClickModify = event => {
    const editForm = event.target.previousSibling;
    const content = editForm.previousSibling;

    editForm.value = content.textContent;

    editForm.classList.toggle('hidden');
    content.classList.toggle('hidden');

    editForm.focus();
  };

  const onEnterEditForm = async event => {
    const content = event.target.previousSibling;

    if (event.key === 'Enter') {
      await updatePaymentMethod({
        accountBookId,
        paymentId: event.target.dataset.cardid,
        name: event.target.dataset.name,
        desc: event.target.value,
        color: event.target.dataset.color,
      });

      updatePayment({
        id: event.target.dataset.cardid,
        desc: event.target.value,
      });
      event.target.classList.toggle('hidden');
      content.classList.toggle('hidden');
    }
  };

  const onClickDelete = async event => {
    await deletePaymentMethod({
      accountBookId,
      paymentId: event.target.dataset.cardid,
    });

    deletePayment(event.target.dataset.cardid);
  };

  return (
    <div className="card__container" data-overlay>
      {paymentMethods.map((card, i) => (
        <div
          key={card._id}
          className="card__container__card"
          style={{
            background: `${card.color}`,
            animationDelay: `${i * 0.08}s`,
          }}
        >
          <div className="card__title">{card.name}</div>
          <div className="card__desc">{card.desc}</div>

          <input
            className="desc__input hidden"
            onKeyPress={onEnterEditForm}
            data-cardid={card._id}
            data-name={card.name}
            data-color={card.color}
          />

          <i
            className="fas fa-edit"
            data-cardid={card._id}
            onClick={onClickModify}
          />
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
