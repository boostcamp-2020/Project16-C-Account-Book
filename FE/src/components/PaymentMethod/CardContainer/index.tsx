import React from 'react';

import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';
import {
  updatePaymentMethod,
  deletePaymentMethod,
} from '../../../api/payment-method';
import './cardContainer.scss';
import { ResponseMessage } from '../../../util/message';

export default React.memo(function CardContainer({
  confirmModal,
}): React.ReactElement {
  const {
    setSaveModal,
    setSaveAction,
    setUpdateData,
    setModalTitle,
  } = confirmModal;

  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const paymentMethods = useAccountBookData(
    store => store.accountBook.payments,
  );
  const updatePayment = useAccountBookData(store => store.updatePaymentMethod);
  const deletePayment = useAccountBookData(store => store.deletePaymentMethod);

  const contentRefArr = [];
  const editFormRefArr = [];
  paymentMethods.forEach(() => {
    contentRefArr.push(React.createRef());
    editFormRefArr.push(React.createRef());
  });

  const onClickModify = event => {
    const index = event.target.dataset.turn;
    const editForm = editFormRefArr[index];
    const content = contentRefArr[index];

    editForm.current.value = content.current.textContent;

    editForm.current.classList.toggle('hidden');
    content.current.classList.toggle('hidden');

    editForm.current.focus();
  };

  const onEnterEditForm = async event => {
    const index = event.target.dataset.turn;
    const content = contentRefArr[index];

    if (event.key === 'Enter') {
      try {
        const res = await updatePaymentMethod({
          accountBookId,
          paymentId: event.target.dataset.cardid,
          name: event.target.dataset.name,
          desc: event.target.value,
          color: event.target.dataset.color,
        });
        if (res.status !== ResponseMessage.success) {
          throw new Error();
        }

        event.target.classList.toggle('hidden');
        content.current.classList.toggle('hidden');
        updatePayment({
          id: event.target.dataset.cardid,
          desc: event.target.value,
        });
      } catch (error) {
        throw new Error();
      }
    }
  };

  const deleteProcess = async event => {
    try {
      const res = await deletePaymentMethod({
        accountBookId,
        paymentId: event.target.dataset.cardid,
      });
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }

      deletePayment(event.target.dataset.cardid);
    } catch (error) {
      throw new Error();
    }
  };

  const onClickDelete = async event => {
    setModalTitle(() => '정말 이 결제수단을 삭제하시겠습니까?');
    setSaveModal(() => true);
    setUpdateData(() => {
      return event;
    });
    setSaveAction(() => deleteProcess);
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
          <div className="card__desc" ref={contentRefArr[i]}>
            {card.desc}
          </div>

          <input
            className="desc__input hidden"
            onKeyPress={onEnterEditForm}
            data-cardid={card._id}
            data-name={card.name}
            data-color={card.color}
            data-turn={i}
            ref={editFormRefArr[i]}
          />

          <i
            className="fas fa-edit"
            data-cardid={card._id}
            onClick={onClickModify}
            data-turn={i}
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
