import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

  const [file, setFile] = useState('import하고싶다');

  const fileChangeHandler = event => {
    const uploadFile = event.target.files;
    setFile(uploadFile);
  };

  const onClickHandler = event => {
    const formData = new FormData();
    formData.append('importCSV', file);
    postTransactionCSV(accountBookId, formData);
  };

  return (
    <div className="csv__setting__container">
      <button className="csv__export" onClick={downloadCSV}>
        거래내역 CSV File로 다운받기
      </button>
      <div className="csv__import__form">
        <input type="file" multiple onChange={fileChangeHandler} />
        <button className="csv__import" onClick={onClickHandler}>
          거래내역 CSV File로 추가하기
        </button>
      </div>
    </div>
  );
}
