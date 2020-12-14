import React, { useState } from 'react';

import CSVReader from 'react-csv-reader';
import ActionButton from '../../../Common/ActionButton';
import './csvImport.scss';
import { postTransactionCSV } from '../../../../api/csv';
import { ResponseMessage } from '../../../../util/message';

export default function CSVImport({ accountBookId }) {
  const [file, setFile] = useState('');

  const onClickHandler = async event => {
    if (file !== '') {
      try {
        const res = await postTransactionCSV(accountBookId, file);
        console.log(res);
        if (res.status !== ResponseMessage.success) {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
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
        Please, select '.csv' file and click Import Button.
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
