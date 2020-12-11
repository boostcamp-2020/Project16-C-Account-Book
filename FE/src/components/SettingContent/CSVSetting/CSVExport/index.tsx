import React from 'react';

import './csvExport.scss';
import exportToCSV from '../../../../service/export';
import ActionButton from '../../../Common/ActionButton';
import { getTransactionCSV } from '../../../../api/csv';

export default function CSVExport({ accountBookId }) {
  const downloadCSV = async () => {
    const response = await getTransactionCSV(accountBookId);
    const csv = response.data;
    exportToCSV(csv);
  };

  return (
    <div className="csv__export__box">
      <div className="csv__export__title">Export</div>
      <div className="csv__export__desc">
        You can get all Transactions in this Account Book.
      </div>
      <div className="csv__export__btn">
        <ActionButton content="Export" action={downloadCSV} type="general" />
      </div>
    </div>
  );
}
