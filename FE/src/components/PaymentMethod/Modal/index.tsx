import React, { useState } from 'react';

import AddTemplate from '../AddTemplate';
import CardContainer from '../CardContainer';
import NewMethod from '../NewMethod';

import { useRootData } from '../../../store/PaymentMethod/paymentMethodHook';

import './modal.scss';

export default function PaymentModal({
  setModal,
  defaultMethod,
}): React.ReactElement {
  const [addFormModal, setAddFormModal] = useState(false);
  const paymentMethods = useRootData(store => store.paymentMethod);

  const onClickNew = () => {
    setAddFormModal(() => !addFormModal);
  };

  const onClickOverlay = event => {
    if (event.target.dataset.overlay) setModal(false);
  };

  return (
    <>
      <div className="modal__wrapper" data-overlay onClick={onClickOverlay}>
        <span className="title">Payment Method</span>
        <button type="button" onClick={onClickNew} className="new__button">
          Add
        </button>
        <CardContainer paymentMethods={paymentMethods} />
      </div>
      {addFormModal && <NewMethod defaultMethod={defaultMethod} />}
      {addFormModal && <AddTemplate setAddFormModal={setAddFormModal} />}
    </>
  );
}
