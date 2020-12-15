import React, { useRef, useCallback, useEffect } from 'react';
import { useDateInfoData } from '../../../../store/DateInfo/dateInfoHook';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { useThemeData } from '../../../../store/Theme/themeHook';
import CalculateDate from '../../../../util/calculateDate';

import './header-date.scss';

export default function HeaderDate({ id, pageType }) {
  const theme = useThemeData(store => store.mode);
  const btnNextRef = useRef();
  const btnPrevRef = useRef();
  const calMonRef = useRef();
  const calYearRef = useRef();

  const setAccountBook = useAccountBookData(store => store.setAccountBook);

  const setDateInfo = useDateInfoData(store => store.setCalendarInfo);
  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);

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

    setAccountBook(id, info.getFullYear(), info.getMonth());
  }, []);

  const onClickPrevMonth = useCallback(() => {
    const info = CalculateDate.prevMonth();
    setYearMonth(info.getFullYear(), info.getMonth());
    setDateInfo(info.getFullYear(), info.getMonth(), info.getDate());

    setAccountBook(id, info.getFullYear(), info.getMonth());
  }, []);

  useEffect(() => {
    setYearMonth(DateInfo.year, DateInfo.month);
  }, [pageType]);

  return (
    <div className="menubar__ctrBox">
      <button
        type="button"
        title="prev"
        className={theme === 'dark' ? 'btn-cal prev' : 'btn-cal prev light'}
        onClick={onClickPrevMonth}
        ref={btnPrevRef}
      />
      <div className={theme === 'dark' ? 'year-month' : 'year-month light'}>
        <span className="cal-year" ref={calYearRef} />
        <span className="cal-month" ref={calMonRef} />
      </div>

      <button
        type="button"
        title="next"
        className={theme === 'dark' ? 'btn-cal next' : 'btn-cal next light'}
        onClick={onClickNextMonth}
        ref={btnNextRef}
      />
    </div>
  );
}
