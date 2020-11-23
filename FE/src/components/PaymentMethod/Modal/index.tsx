import React, { useState, useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { paymentContext } from '../../../store/PaymentMethod/paymentMethodContext';
import AddTemplate from '../AddTemplate';
import CardContainer from '../CardContainer';
import NewMethod from '../NewMethod';

import './modal.scss';

export default function Modal({ setModal, defaultMethod }): React.ReactElement {
  const store = useContext(paymentContext);
  const [addFormModal, setAddFormModal] = useState(false);
  const [methodNick, setMethodNick] = useState('');

  const onClickNew = () => {
    setAddFormModal(() => !addFormModal);
  };

  const onClickOverlay = event => {
    if (event.target.dataset.overlay) setModal(false);
  };

  return useObserver(() => {
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
            name={store?.addTemplateData.name}
            color={store?.addTemplateData.color}
            setMethodNick={setMethodNick}
            methodNick={methodNick}
            setAddFormModal={setAddFormModal}
          />
        )}
      </>
    );
  });
}
