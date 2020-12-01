import React, { useRef, useEffect, useState, useCallback } from 'react';

import { useRootData } from '../../store/DateInfo/dateInfoHook';
import CalculateDate from '../../util/calculateDate';
import DetailModal from './DetailModal';
import './calendar.scss';

export default function Calendar() {
  const calBodyRef = useRef();

  const [detailModal, setDetailModal] = useState(true);

  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const setDateInfo = useRootData(store => store.setCalendarInfo);

  const makeCalendar = (year, month) => {
    const allDay = calculateDay(year, month);
    calBodyRef.current.innerHTML = allDay;
  };

  const onClickCalBody = useCallback(
    event => {
      if (
        event.target.classList.contains('day') ||
        event.target.classList.contains('today')
      ) {
        const day = Number(event.target.textContent);

        CalculateDate.activeDTag = event.target;
        CalculateDate.activeDate.setDate(day);
        setDetailModal(() => true);
        setDateInfo(DateInfo.year, DateInfo.month, day);
      }
    },
    [DateInfo],
  );

  useEffect(() => {
    makeCalendar(DateInfo.year, DateInfo.month);
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
            />
          </table>
        </div>
      </div>
      {detailModal && <DetailModal setDetailModal={setDetailModal} />}
    </div>
  );
}

export const calculateDay = (year, month) => {
  const yy = year;
  const mm = month;
  const firstDay = CalculateDate.getFirstDay(yy, mm);
  const lastDay = CalculateDate.getLastDay(yy, mm);
  let markToday;

  if (
    mm === CalculateDate.today.getMonth() &&
    yy === CalculateDate.today.getFullYear()
  ) {
    markToday = CalculateDate.today.getDate();
  }

  let trtd = '';
  let startCount;
  let countDay = 0;

  for (let i = 0; i < 6; i++) {
    trtd += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (!startCount) {
        trtd += '<td>';
      } else {
        const fullDate = `${yy}.${CalculateDate.addZero(
          mm + 1,
        )}.${CalculateDate.addZero(countDay + 1)}`;
        trtd += `
          <td class="day
          ${
            markToday && markToday === countDay + 1
              ? '"><div class="today"'
              : '"'
          } 
          data-date="${countDay + 1}" data-fdate="${fullDate}">
          `;
      }

      trtd += startCount ? ++countDay : '';

      if (markToday && markToday === countDay) {
        trtd += '</div>';
      }

      if (countDay === lastDay.getDate()) {
        startCount = 0;
      }

      trtd += '</td>';
    }
    trtd += '</tr>';
  }
  return trtd;
};
