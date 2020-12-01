import React, { useEffect, useRef, useCallback } from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/TransactionData/transactionInfoHook';
import CommaMaker from '../../../util/commaForMoney';
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
                  <span className="specific__category">
                    {item.category.name}
                  </span>
                  <span className="specific__content">{item.content}</span>
                  <span className="specific__payment">
                    {item.payment.description}
                  </span>
                  {item.type === '지출' ? (
                    <span className="specific__cost spending">
                      -{CommaMaker(item.cost)}원
                    </span>
                  ) : (
                    <span className="specific__cost income">
                      +{CommaMaker(item.cost)}원
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="no__specific__data">No Transactions</div>
          )}
        </div>
      </div>
    </div>
  );
}
