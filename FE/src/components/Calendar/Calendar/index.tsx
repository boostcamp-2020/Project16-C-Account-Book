import React, { useState, useCallback } from 'react';

import { useDateInfoData } from '../../../store/DateInfo/dateInfoHook';
import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';
import { useThemeData } from '../../../store/Theme/themeHook';
import CalculateDate from '../../../util/calculateDate';
import DetailModal from '../DetailModal';

import CalendarHeader from '../CalendarHeader';
import CalendarBody from '../CalendarBody';
import './calendar.scss';

export default function Calendar() {
  const theme = useThemeData(store => store.mode);
  const [detailModal, setDetailModal] = useState(false);

  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);
  const setDateInfo = useDateInfoData(store => store.setCalendarInfo);

  const startDay = useAccountBookData(store => store.accountBook.startday);

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

  return (
    <div className="calendar-container">
      <div className="my-calendar">
        <div className="calendar-box">
          <table className="cal-table">
            <thead className={theme !== 'dark' && 'light'}>
              <tr>
                <CalendarHeader startDay={startDay} />
              </tr>
            </thead>
            <tbody className="cal-body" onClick={onClickCalBody}>
              <CalendarBody />
            </tbody>
          </table>
        </div>
      </div>
      {detailModal && <DetailModal setDetailModal={setDetailModal} />}
    </div>
  );
}
