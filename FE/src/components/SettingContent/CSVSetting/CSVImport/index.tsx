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
      <div className="csv__import__desc">
        Please, select '.csv' file and click Import Button
      </div>
      <div className="csv__import__content">
        <CSVReader
          onFileLoaded={data => fileChangeHandler(data)}
          cssInputClass="csv__import__input"
          cssClass="csv__import__filebox"
        />
        <div className="csv__import__btn">
          <ActionButton
            content="Import"
            action={onClickHandler}
            type="general"
          />
        </div>
      </div>
    </div>
  );
}
