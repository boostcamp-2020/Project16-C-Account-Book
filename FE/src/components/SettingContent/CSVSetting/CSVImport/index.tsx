import React, { useState } from 'react';

import CSVReader from 'react-csv-reader';
import ActionButton from '../../../Common/ActionButton';
import './csvImport.scss';
import { postTransactionCSV } from '../../../../api/csv';

export default function CSVImport(props) {
  const [file, setFile] = useState('');

  const onClickHandler = async event => {
    if (file !== '') {
      await postTransactionCSV(accountBookId, file);
    }
  };

  const fileChangeHandler = data => {
    const uploadFile = data;
    setFile(uploadFile);
  };

  return (
    <div className="csv__import__box">
      <div className="csv__import__title">Import</div>
      <ActionButton content="Import" action={onClickHandler} type="large" />
      <CSVReader
        onFileLoaded={data => fileChangeHandler(data)}
        cssInputClass="csv__import__input"
        cssClass="csv__import__filebox"
        cssLabelClass="csv__import__filebtn"
      />
    </div>
  );
}
