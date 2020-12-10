import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CSVReader from 'react-csv-reader';

import './csvSetting.scss';
import { getTransactionCSV, postTransactionCSV } from '../../../api/csv';
import exportToCSV from '../../../service/export';

export default function CSVSetting(props) {
  const accountBookId = useHistory().location.state.id;

  const downloadCSV = async () => {
    const response = await getTransactionCSV(accountBookId);
    const csv = response.data;
    exportToCSV(csv);
  };

  const [file, setFile] = useState('');

  const fileChangeHandler = data => {
    const uploadFile = data;
    setFile(uploadFile);
  };

  const onClickHandler = async event => {
    if (file !== '') {
      await postTransactionCSV(accountBookId, file);
    }
  };

  return (
    <div className="csv__setting__container">
      <button className="csv__export" onClick={downloadCSV}>
        거래내역 CSV File로 다운받기
      </button>
      <div className="csv__import__form">
        <CSVReader onFileLoaded={data => fileChangeHandler(data)} />
        <button className="csv__import" onClick={onClickHandler}>
          거래내역 CSV File로 추가하기
        </button>
      </div>
    </div>
  );
}
