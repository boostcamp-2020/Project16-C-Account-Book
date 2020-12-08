import React from 'react';
import { useHistory } from 'react-router-dom';

import './csvSetting.scss';
import getTransactionCSV from '../../../api/csv';
import exportToCSV from '../../../service/export';

export default function CSVSetting(props) {
  const accountBookId = useHistory().location.state.id;

  const downloadCSV = async () => {
    const response = await getTransactionCSV(accountBookId);
    const csv = response.data;
    exportToCSV(csv);
  };

  return (
    <div className="csv__setting__container">
      <button className="csv__export" onClick={downloadCSV}>
        거래내역 CSV File로 다운받기
      </button>
      <button className="csv__import">거래내역 CSV File로 추가하기</button>
    </div>
  );
}
