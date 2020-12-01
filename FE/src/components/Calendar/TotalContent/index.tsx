import React from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/TransactionData/transactionInfoHook';
import './totalContent.scss';

export default function TotalContent(props) {
  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const incomeTotal = useTransactionData(store =>
    store.getIncomeTotal(DateInfo.year, DateInfo.month + 1),
  );
  const spendingTotal = useTransactionData(store =>
    store.getSpendingTotal(DateInfo.year, DateInfo.month + 1),
  );

  return (
    <div className="calendar__total__price">
      <div className="calendar__income__total">+{incomeTotal}원</div>
      <div className="calendar__spending__total">-{spendingTotal}원</div>
    </div>
  );
}
