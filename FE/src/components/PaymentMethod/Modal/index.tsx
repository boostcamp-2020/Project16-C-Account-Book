import React, { useState } from 'react';

import AddTemplate from '../AddTemplate';
import CardContainer from '../CardContainer';
import NewMethod from '../NewMethod';

import './modal.scss';

export default function Modal({ setModal }): React.ReactElement {
  const [addForm, setAddForm] = useState(false);
  const [addData, setAddData] = useState({ name: '', color: '' });
  const [methodNick, setMethodNick] = useState('');

  // 백엔드에서 받아올 default 결제수단.
  const defaultMethod = [
    { name: 'KB 국민카드', color: 'hsla(0, 100%, 50%, 0.93)' },
    { name: 'Kakao ', color: 'hsla(40, 100%, 50%, 0.93)' },
    { name: 'SC 제일은행', color: 'hsla(80, 100%, 50%, 0.93)' },
    { name: 'Naver ', color: 'hsla(120, 100%, 50%, 0.93)' },
    { name: 'KEB Hana ', color: 'hsla(160, 100%, 50%, 0.93)' },
    { name: 'WOORI Card', color: 'hsla(200, 100%, 50%, 0.93)' },
    { name: 'Samsung', color: 'hsla(240, 100%, 50%, 0.93)' },
    { name: 'Hyundai', color: 'hsla(280, 100%, 50%, 0.93)' },
    { name: 'BC Card', color: 'hsla(320, 100%, 50%, 0.93)' },
  ];

  const onClickNew = () => {
    setAddForm(() => !addForm);
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
      {addForm && (
        <NewMethod setAddData={setAddData} defaultMethod={defaultMethod} />
      )}
      {addForm && (
        <AddTemplate
          name={addData.name}
          color={addData.color}
          setMethodNick={setMethodNick}
          setAddData={setAddData}
          methodNick={methodNick}
          setAddForm={setAddForm}
        />
      )}
    </>
  );
}
