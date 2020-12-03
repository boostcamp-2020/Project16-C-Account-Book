import React, { useRef, useEffect, useContext, useState } from 'react';
import { paymentContext } from '../../../store/PaymentMethod/paymentMethodContext';
import { useRootData } from '../../../store/PaymentMethod/paymentMethodHook';

import './addForm.scss';

interface Card {
  setAddFormModal: (data: boolean) => void;
}

export default function AddTemplate({
  setAddFormModal,
}: Card): React.ReactElement {
  const [methodNick, setMethodNick] = useState('');
  const methodInput = useRef();
  const store = useContext(paymentContext);
  const addTemplateData = useRootData(store => store.addTemplateData);
  const addPaymentMethod = useRootData(store => store.addPaymentMethod);
  const updateAddTemplate = useRootData(store => store.updateAddTemplate);

  const onChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethodNick(event.target.value);
  };

  const onAddCard = event => {
    if (event.key === 'Enter') {
      addPaymentMethod({
        name: addTemplateData.name,
        desc: `${methodNick}`,
        color: addTemplateData.color,
      });

      setAddFormModal(() => false);
      updateAddTemplate({ name: '', color: '' });
      setMethodNick(() => '');
    }
  };

  useEffect(() => {
    if (addTemplateData.name) {
      methodInput.current.focus();
    }
  });

  return (
    <div
      className={
        addTemplateData.name.length === 0
          ? 'addform__wrapper'
          : 'addform__wrapper selected'
      }
      style={{ background: `${addTemplateData.color}` }}
    >
      {addTemplateData.name || '아래에서 카드를 선택해주세요.'}
      {addTemplateData.name && (
        <input
          ref={methodInput}
          value={methodNick}
          className="addform__method__name"
          type="text"
          placeholder="Enter Method Nickname"
          onChange={onChangeNick}
          onKeyPress={onAddCard}
        />
      )}
    </div>
  );
}
