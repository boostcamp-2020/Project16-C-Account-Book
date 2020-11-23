import React, { useState, useContext } from 'react';
import { paymentContext } from '../../../store/PaymentMethod/paymentMethodContext';
import { useRootData } from '../../../store/PaymentMethod/paymentMethodHook';
import AddTemplate from '../AddTemplate';
import CardContainer from '../CardContainer';
import NewMethod from '../NewMethod';

import './modal.scss';

export default function Modal({ setModal, defaultMethod }): React.ReactElement {
  const store = useContext(paymentContext);
  const addTemplateData = useRootData(store => store.addTemplateData);
  const [addFormModal, setAddFormModal] = useState(false);
  const [methodNick, setMethodNick] = useState('');

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
        <CardContainer />
      </div>
      {addFormModal && <NewMethod defaultMethod={defaultMethod} />}
      {addFormModal && (
        <AddTemplate
          name={addTemplateData.name}
          color={addTemplateData.color}
          setMethodNick={setMethodNick}
          methodNick={methodNick}
          setAddFormModal={setAddFormModal}
        />
      )}
    </>
  );
}
