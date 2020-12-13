import React, { useRef, useCallback, useEffect } from 'react';
import { useDateInfoData } from '../../../../store/DateInfo/dateInfoHook';

import CalculateDate from '../../../../util/calculateDate';
import './header-date.scss';

export default function HeaderDate({ pageType }) {
  const btnNextRef = useRef();
  const btnPrevRef = useRef();
  const calMonRef = useRef();
  const calYearRef = useRef();

  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);

  const setDateInfo = useDateInfoData(store => store.setCalendarInfo);

  const setYearMonth = useCallback((year, month) => {
    const yy = year;
    const mm = month;

    calMonRef.current.textContent = CalculateDate.monList[mm];
    calYearRef.current.textContent = yy;
  }, []);

  const onClickNextMonth = useCallback(() => {
    const info = CalculateDate.nextMonth();
    setYearMonth(info.getFullYear(), info.getMonth());
    setDateInfo(info.getFullYear(), info.getMonth(), info.getDate());
  }, []);

  const onClickPrevMonth = useCallback(() => {
    const info = CalculateDate.prevMonth();
    setYearMonth(info.getFullYear(), info.getMonth());
    setDateInfo(info.getFullYear(), info.getMonth(), info.getDate());
  }, []);

  useEffect(() => {
    setYearMonth(DateInfo.year, DateInfo.month);
  }, [pageType]);

  return (
    <div className="menubar__ctrBox">
      <button
        type="button"
        title="prev"
        className="btn-cal prev"
        onClick={onClickPrevMonth}
        ref={btnPrevRef}
      />
      <div className="year-month">
        <span className="cal-year" ref={calYearRef} />
        <span className="cal-month" ref={calMonRef} />
      </div>

      <button
        type="button"
        title="next"
        className="btn-cal next"
        onClick={onClickNextMonth}
        ref={btnNextRef}
      />
    </div>
  );
}
