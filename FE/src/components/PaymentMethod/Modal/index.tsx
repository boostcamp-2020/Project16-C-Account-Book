import React, { useState } from 'react';

import AddTemplate from '../AddTemplate';
import CardContainer from '../CardContainer';
import NewMethod from '../NewMethod';

import './modal.scss';

export default function Modal({ setModal }): React.ReactElement {
  const [addForm, setAddForm] = useState(false);
  const [addData, setAddData] = useState({ name: '', color: '' });
  const [methodNick, setMethodNick] = useState('');
  const [mockData, setMockData] = useState([
    { name: 'Naver', desc: 'main method', color: 'hsla(120, 100%, 50%, 0.93)' },
    { name: 'Kakao', desc: 'sub method', color: 'hsla(40, 100%, 50%, 0.93)' },
  ]);

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
        <CardContainer mockData={mockData} />
      </div>
      {addForm && <NewMethod setAddData={setAddData} />}
      {addForm && (
        <AddTemplate
          name={addData.name}
          color={addData.color}
          setMethodNick={setMethodNick}
          setAddData={setAddData}
          methodNick={methodNick}
          mockData={mockData}
          setMockData={setMockData}
          setAddForm={setAddForm}
        />
      )}
    </>
  );
}
