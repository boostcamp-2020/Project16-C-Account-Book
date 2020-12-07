import React, { useState, useCallback } from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';

import CalculateDate from '../../../util/calculateDate';
import DetailModal from '../DetailModal';

import CalendarHeader from '../CalendarHeader';
import CalendarBody from '../CalendarBody';
import './calendar.scss';

export default function Calendar() {
  const [detailModal, setDetailModal] = useState(false);

  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const setDateInfo = useRootData(store => store.setCalendarInfo);

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
            <thead>
              <tr>
                <CalendarHeader />
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
