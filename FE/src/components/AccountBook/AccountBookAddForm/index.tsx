import React, { useState } from 'react';

import CreateForm from './CreateForm';
import JoinForm from './JoinForm';

import './index.scss';

export default function AccountBookAddForm({
  setCreate,
  createForm,
  datas,
  setDatas,
}) {
  const [name, setName] = useState('');

  const cancleCreate = () => {
    setCreate(false);
  };

  return (
    <div className="create__acbook">
      {createForm === 'create' ? (
        <CreateForm
          name={name}
          setName={setName}
          setCreate={setCreate}
          datas={datas}
          setDatas={setDatas}
        />
      ) : (
        <>
          <JoinForm
            datas={datas}
            setName={setName}
            setCreate={setCreate}
            setDatas={setDatas}
            datas
          />
        </>
      )}

      <i className="fas fa-minus-circle" onClick={cancleCreate} />
    </div>
  );
}
