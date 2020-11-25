import React, { useRef, useEffect, useCallback, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { useRootData } from '../../../store/DateInfo/dateInfoHook';

import styles from './menubar.module.scss';
import CalculateDate from '../../../util/calculateDate';

const MenuBar = ({ setModal }) => {
  const history = useHistory();
  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const setDateInfo = useRootData(store => store.setCalendarInfo);

  const btnNextRef = useRef();
  const btnPrevRef = useRef();
  const calMonRef = useRef();
  const calYearRef = useRef();

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

  const onClickCalendar = useCallback(() => {
    history.push('/calendar');
  }, []);

  const onClickPayment = useCallback(() => {
    setModal(true);
  }, []);

  useEffect(() => {
    setYearMonth(DateInfo.year, DateInfo.month);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        <button className={styles.navBtn}>
          <i className="fas fa-history" />
        </button>
        <button className={styles.navBtn} onClick={onClickCalendar}>
          <i className="far fa-calendar-alt" />
        </button>
        <button className={styles.navBtn}>
          <i className="far fa-chart-bar" />
        </button>
        <button className={styles.navBtn} onClick={onClickPayment}>
          <i className="fas fa-credit-card" />
        </button>
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
