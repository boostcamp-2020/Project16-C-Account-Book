import React, { useRef, useEffect, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useRootData } from '../../../store/DateInfo/dateInfoHook';

import styles from './menubar.module.scss';
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

  const setIcon = useCallback(
    pageType => {
      if (pageType === 'transaction') {
        transactionIconRef.current.classList.toggle(styles.checked);
      }
      if (pageType === 'calendar') {
        calIconRef.current.classList.toggle(styles.checked);
      }
      if (pageType === 'chart') {
        chartIconRef.current.classList.toggle(styles.checked);
      }
    },
    [pageType],
  );

  useEffect(() => {
    setIcon(pageType);
    setYearMonth(DateInfo.year, DateInfo.month);
  }, [pageType]);

  return (
    <header className={styles.header}>
      <div className={styles.buttons} ref={allBtnRef}>
        <div
          ref={transactionIconRef}
          className={styles.navBtn}
          data-type="transaction"
          onClick={onClickIcon}
        >
          <i data-type="transaction" className="fas fa-history" />
        </div>
        <div
          ref={calIconRef}
          className={styles.navBtn}
          data-type="calendar"
          onClick={onClickIcon}
        >
          <i data-type="calendar" className="far fa-calendar-alt" />
        </div>
        <div
          ref={chartIconRef}
          className={styles.navBtn}
          data-type="chart"
          onClick={onClickIcon}
        >
          <i data-type="chart" className="far fa-chart-bar" />
        </div>
        <div className={styles.navBtn} onClick={onClickPayment}>
          <i className="fas fa-credit-card" />
        </div>
      </div>

      <div className={styles.ctrBox}>
        <button
          type="button"
          title="prev"
          className={`${styles['btn-cal']} ${styles.prev}`}
          onClick={onClickPrevMonth}
          ref={btnPrevRef}
        />
        <div className={styles['year-month']}>
          <span className={styles['cal-year']} ref={calYearRef} />
          <span className={styles['cal-month']} ref={calMonRef} />
        </div>

        <button
          type="button"
          title="next"
          className={`${styles['btn-cal']} ${styles.next}`}
          onClick={onClickNextMonth}
          ref={btnNextRef}
        />
      </div>
    </header>
  );
};
export default MenuBar;
