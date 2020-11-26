import React, { useRef, useEffect, useContext, useCallback } from 'react';

import { useRootData } from '../../store/DateInfo/dateInfoHook';
import CalculateDate from '../../util/calculateDate';
import './calendar.scss';

const Calendar = props => {
  const calDateRef = useRef();
  const calDayRef = useRef();
  const calBodyRef = useRef();
  const detailRef = useRef();

  const DateInfo = useRootData(store => store.nowCalendarInfo);

  const loadDate = (date, dayIn) => {
    calDateRef.current.textContent = `${date}일`;
    calDayRef.current.textContent = CalculateDate.dayList[dayIn];
  };

  const makeCalendar = (year, month) => {
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
    calBodyRef.current.innerHTML = trtd;
  };

  const onClickCalBody = useCallback(event => {
    if (event.target.classList.contains('day')) {
      if (CalculateDate.activeDTag) {
        CalculateDate.activeDTag.classList.remove('day-active');
      }
      const day = Number(event.target.textContent);
      loadDate(day, event.target.cellIndex);
      event.target.classList.add('day-active');
      CalculateDate.activeDTag = event.target;
      CalculateDate.activeDate.setDate(day);
    }
  }, []);

  useEffect(() => {
    makeCalendar(DateInfo.year, DateInfo.month);
    loadDate(CalculateDate.today.getDate(), CalculateDate.today.getDay());
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
        <div ref={detailRef} className="detail__overlay hidden">
          <div className="clicked-date">
            <div className="cal-day" ref={calDayRef} />
            <div className="cal-date" ref={calDateRef} />
            <div className="cal-transition">내역들</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
