import React, { useEffect, useRef, useCallback } from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import CommaMaker from '../../../util/commaForMoney';
import './detailModal.scss';

export default function DetailModal({ setDetailModal }) {
  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const SpecificTransactions = useTransactionData(
    store => store.getSpecificTransactions,
  );

  const transactions = SpecificTransactions(
    DateInfo.year,
    DateInfo.month + 1,
    DateInfo.day,
  );

  const onClickDetailOverlay = event => {
    setDetailModal(false);
  };

  return (
    <div className="detail-info-overlay" onClick={onClickDetailOverlay}>
      <div className="clicked-date" onClick={e => e.stopPropagation()}>
        <div className="cal-date-info">
          <span className="cal-year">{DateInfo.year}년</span>
          <span className="cal-month">{DateInfo.month + 1}월</span>
          <span className="cal-date">{DateInfo.day}일</span>
        </div>
        <div className="cal-transition">
          {transactions.length !== 0 ? (
            transactions.map((item, i) => {
              return (
                <div
                  className="specific__transaction__unit"
                  key={item._id}
                  style={{
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
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
