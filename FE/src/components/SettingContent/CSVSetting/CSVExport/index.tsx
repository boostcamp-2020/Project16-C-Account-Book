import React from 'react';
import { Link } from 'react-router-dom';

import './csvExport.scss';
import exportToCSV from '../../../../service/export';
import ActionButton from '../../../Common/ActionButton';
import { getTransactionCSV, getTemplateCSV } from '../../../../api/csv';
import { ResponseMessage } from '../../../../util/message';

export default function CSVExport({ accountBookId }) {
  const downloadCSV = async () => {
    try {
      const res = await getTransactionCSV(accountBookId);
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }
      const csv = res.data;
      exportToCSV(csv, 'transactions.csv');
    } catch (error) {
      throw new Error();
    }
  };

  const downloadTemplateCSV = async () => {
    try {
      const res = await getTemplateCSV(accountBookId);
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }
      const csv = res.data;
      exportToCSV(csv, 'template.csv');
    } catch (error) {
      throw new Error();
    }
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
      <div className="csv__export__desc">You can download Template.csv</div>
      <div className="csv__export__btn">
        <ActionButton
          content="Download"
          action={downloadTemplateCSV}
          type="general"
        />
      </div>
    </div>
  );
}
