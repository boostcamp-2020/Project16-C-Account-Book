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
      <ActionButton content="Export" action={downloadCSV} type="large" />
    </div>
  );
}
