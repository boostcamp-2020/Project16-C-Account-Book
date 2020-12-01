import React, { useEffect, useRef, useCallback } from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import './detailModal.scss';

export default function DetailModal({ setDetailModal }) {
  const calDateRef = useRef();
  const calMonthRef = useRef();
  const calYearRef = useRef();

  const DateInfo = useRootData(store => store.nowCalendarInfo);

  const loadDate = useCallback(() => {
    calYearRef.current.textContent = `${DateInfo.year}년`;
    calMonthRef.current.textContent = `${DateInfo.month + 1}월`;
    calDateRef.current.textContent = `${DateInfo.day}일`;
  }, [DateInfo]);

  const onClickDetailOverlay = event => {
    if (event.target.classList.contains('detail-info-overlay')) {
      setDetailModal(false);
    }
  };

  useEffect(() => {
    loadDate();
  }, []);

  return (
    <div className="detail-info-overlay" onClick={onClickDetailOverlay}>
      <div className="clicked-date">
        <div className="cal-date-info">
          <span className="cal-year" ref={calYearRef} />
          <span className="cal-month" ref={calMonthRef} />
          <span className="cal-date" ref={calDateRef} />
        </div>
        <div className="cal-transition">내역들</div>
      </div>
    </div>
  );
}
