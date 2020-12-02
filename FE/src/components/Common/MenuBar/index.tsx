import React, { useRef, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useRootData } from '../../../store/DateInfo/dateInfoHook';

import './menubar.scss';
import CalculateDate from '../../../util/calculateDate';

const MenuBar = ({ setModal, pageType }) => {
  const history = useHistory();
  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const setDateInfo = useRootData(store => store.setCalendarInfo);

  const allBtnRef = useRef();
  const btnNextRef = useRef();
  const btnPrevRef = useRef();
  const calMonRef = useRef();
  const calYearRef = useRef();
  const transactionIconRef = useRef();
  const calIconRef = useRef();
  const chartIconRef = useRef();

  const setYearMonth = useCallback((year, month) => {
    const yy = year;
    const mm = month;

    calMonRef.current.textContent = CalculateDate.monList[mm];
    calYearRef.current.textContent = yy;
  }, []);

  const onClickNextMonth = useCallback(() => {
    const info = CalculateDate.nextMonth();
    setYearMonth(info.getFullYear(), info.getMonth());
    setDateInfo(info.getFullYear(), info.getMonth());
  }, []);

  const onClickPrevMonth = useCallback(() => {
    const info = CalculateDate.prevMonth();
    setYearMonth(info.getFullYear(), info.getMonth());
    setDateInfo(info.getFullYear(), info.getMonth());
  }, []);

  const onClickIcon = useCallback(event => {
    history.push(event.target.dataset.type);
  }, []);

  const onClickPayment = useCallback(() => {
    setModal(true);
  }, []);

  useEffect(() => {
    setYearMonth(DateInfo.year, DateInfo.month);
  }, [pageType]);

  return (
    <header className="menubar__header">
      <div className="menubar__buttons" ref={allBtnRef}>
        <div
          ref={transactionIconRef}
          className={
            pageType === 'transaction'
              ? 'menubar__navBtn checked'
              : 'menubar__navBtn'
          }
          data-type="transaction"
          onClick={onClickIcon}
        >
          <i data-type="transaction" className="fas fa-history" />
        </div>
        <div
          ref={calIconRef}
          className={
            pageType === 'calendar'
              ? 'menubar__navBtn checked'
              : 'menubar__navBtn'
          }
          data-type="calendar"
          onClick={onClickIcon}
        >
          <i data-type="calendar" className="far fa-calendar-alt" />
        </div>
        <div
          ref={chartIconRef}
          className={
            pageType === 'chart' ? 'menubar__navBtn checked' : 'menubar__navBtn'
          }
          data-type="chart"
          onClick={onClickIcon}
        >
          <i data-type="chart" className="far fa-chart-bar" />
        </div>
        <div className="menubar__navBtn" onClick={onClickPayment}>
          <i className="fas fa-credit-card" />
        </div>
      </div>

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
    </header>
  );
};
export default MenuBar;
