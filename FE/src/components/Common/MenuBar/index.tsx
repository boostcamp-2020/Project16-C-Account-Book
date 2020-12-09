import React, { useRef, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useDateInfoData } from '../../../store/DateInfo/dateInfoHook';
import HeaderButton from '../HeaderButton';
import './menubar.scss';
import CalculateDate from '../../../util/calculateDate';

const MenuBar = ({ id, setModal, pageType }) => {
  const history = useHistory();
  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);
  const setDateInfo = useDateInfoData(store => store.setCalendarInfo);

  const allBtnRef = useRef();
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

  const onClickIcon = useCallback(event => {
    history.push({
      pathname: event.target.dataset.type,
      state: {
        id,
      },
    });
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
          className={pageType === '/' ? 'back__navBtn checked' : 'back__navBtn'}
          data-type="/"
          onClick={onClickIcon}
        >
          <i data-type="/" className="fas fa-arrow-left" />
          <span data-type="/">List</span>
        </div>
        {pageType === 'transaction' ? (
          <HeaderButton
            buttonType="transaction"
            isChecked
            onClickIcon={onClickIcon}
          />
        ) : (
          <HeaderButton
            buttonType="transaction"
            isChecked={false}
            onClickIcon={onClickIcon}
          />
        )}
        {pageType === 'calendar' ? (
          <HeaderButton
            buttonType="calendar"
            isChecked
            onClickIcon={onClickIcon}
          />
        ) : (
          <HeaderButton
            buttonType="calendar"
            isChecked={false}
            onClickIcon={onClickIcon}
          />
        )}
        {pageType === 'chart' ? (
          <HeaderButton
            buttonType="chart"
            isChecked
            onClickIcon={onClickIcon}
          />
        ) : (
          <HeaderButton
            buttonType="chart"
            isChecked={false}
            onClickIcon={onClickIcon}
          />
        )}

        <HeaderButton
          buttonType="paymentMethod"
          isChecked={false}
          onClickIcon={onClickPayment}
        />

        <div
          className={
            pageType === '/setting'
              ? 'setting__navBtn checked'
              : 'setting__navBtn'
          }
          data-type="setting"
          onClick={onClickIcon}
        >
          <span data-type="/setting">Setting</span>
          <i data-type="/setting" className="fas fa-arrow-right" />
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
