import React from 'react';
import './index.scss';

import TransactionItem from '../TransactionItem';
import { iTransactionsOfOneDay } from '../../../../types/transaction';

const TransactionsOfOneDay = ({
  date,
  transactions,
}: iTransactionsOfOneDay) => {
  return (
    <div className="transactions__oneday__day">
      <div className="transactions__oneday__daybar">{date}일</div>
      <div className="transactions__oneday__container">
        {transactions.map(t => (
          <TransactionItem
            date={date}
            category={t.category}
            content={t.content}
            payment={t.payment}
            cost={t.cost}
            type={t.type}
            id={t._id}
            key={t._id}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsOfOneDay;
