import React from 'react';

export default function TransactionByDate() {
  return (
    <div ref={detailRef} className="detail__overlay hidden">
      <div className="clicked-date">
        <div className="cal-day" ref={calDayRef} />
        <div className="cal-date" ref={calDateRef} />
        <div className="cal-transition">내역들</div>
      </div>
    </div>
  );
}
