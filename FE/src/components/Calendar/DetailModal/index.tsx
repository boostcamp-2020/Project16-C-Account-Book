import React, { useEffect, useRef, useCallback } from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/TransactionData/transactionInfoHook';
import './detailModal.scss';

export default function DetailModal({ setDetailModal }) {
  const calDateRef = useRef();
  const calMonthRef = useRef();
  const calYearRef = useRef();

  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const SpecificTransactions = useTransactionData(
    store => store.getSpecificTransactions,
  );

  const transactions = SpecificTransactions(
    DateInfo.year,
    DateInfo.month + 1,
    DateInfo.day,
  );

  const loadDate = useCallback(() => {
    calYearRef.current.textContent = `${DateInfo.year}년`;
    calMonthRef.current.textContent = `${DateInfo.month + 1}월`;
    calDateRef.current.textContent = `${DateInfo.day}일`;
  }, [DateInfo]);

  const onClickDetailOverlay = event => {
    if (event.target.classList.contains('detail-info-overlay')) {
      setDetailModal(false);
    }
  };

  useEffect(() => {
    loadDate();
  }, []);

  return (
    <div className="detail-info-overlay" onClick={onClickDetailOverlay}>
      <div className="clicked-date">
        <div className="cal-date-info">
          <span className="cal-year" ref={calYearRef} />
          <span className="cal-month" ref={calMonthRef} />
          <span className="cal-date" ref={calDateRef} />
        </div>
        <div className="cal-transition">
          {transactions.length !== 0 ? (
            transactions.map(item => {
              return (
                <div className="specific__transaction__unit" key={item._id}>
                  <span className="specific__cost">{item.type}</span>
                  <span className="specific__cost">{item.category.name}</span>
                  <span className="specific__cost">
                    {item.payment.description}
                  </span>
                  <span className="specific__cost">{item.cost}</span>
                </div>
              );
            })
          ) : (
            <div>No Transactions</div>
          )}
        </div>
      </div>
    </div>
  );
}
