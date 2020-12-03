import React, { useRef, useEffect, useState, useCallback } from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/TransactionData/transactionInfoHook';
import CalculateDate from '../../../util/calculateDate';
import DetailModal from '../DetailModal';
import CommaMaker from '../../../util/commaForMoney';
import CalendarBody from '../CalendarBody';
import './calendar.scss';

export default function Calendar() {
  const calBodyRef = useRef();

  const [detailModal, setDetailModal] = useState(false);

  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const setDateInfo = useRootData(store => store.setCalendarInfo);
  const YearMonthTransactions = useTransactionData(store =>
    store.getTransactionsForCalendar(DateInfo.year, DateInfo.month + 1),
  );

  const markPriceToCalendar = () => {
    Object.entries(YearMonthTransactions).forEach(([day, info]) => {
      calBodyRef.current.childNodes.forEach(el => {
        const priceInfo = 1;
        el.childNodes.forEach(date => {
          if (
            date.classList &&
            date.classList.contains(day) &&
            date.childNodes[priceInfo] === undefined
          ) {
            date.insertAdjacentHTML(
              'beforeend',
              `
              <div class="income__info" data-date=${day}>+${CommaMaker(
                info.income,
              )}원</div>
              <div class="spending__info" data-date=${day}>-${CommaMaker(
                info.spending,
              )}원</div>
            `,
            );
          }
        });
      });
    });
  };

  const onClickCalBody = useCallback(
    event => {
      if (event.target.dataset.date) {
        const day = Number(event.target.dataset.date);
        CalculateDate.activeDTag = event.target;
        CalculateDate.activeDate.setDate(day);
        setDetailModal(() => true);
        setDateInfo(DateInfo.year, DateInfo.month, day);
      }
    },
    [DateInfo],
  );

  useEffect(() => {
    markPriceToCalendar();
  }, [DateInfo]);

  return (
    <div className="calendar-container">
      <div className="my-calendar">
        <div className="calendar-box">
          <table className="cal-table">
            <thead>
              <tr>
                <th>SUN</th>
                <th>MON</th>
                <th>TUE</th>
                <th>WED</th>
                <th>THU</th>
                <th>FRI</th>
                <th>SAT</th>
              </tr>
            </thead>
            <tbody
              className="cal-body"
              ref={calBodyRef}
              onClick={onClickCalBody}
            >
              <CalendarBody year={DateInfo.year} month={DateInfo.month} />
            </tbody>
          </table>
        </div>
      </div>
      {detailModal && <DetailModal setDetailModal={setDetailModal} />}
    </div>
  );
}
