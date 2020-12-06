import React from 'react';

import calculateDate from '../../../../util/calculateDate';
import './index.scss';

const DateInput = ({ year, month, today, day, setYear, setMonth, setDay }) => {
  return (
    <div className="item date__input">
      <div className="indicator">날짜</div>
      <div className="row">
        <div className="row__item">
          <select name="year" defaultValue={year}>
            {Array.from(
              { length: 61 },
              (_, i) => i + +(today.getFullYear() - 30),
            ).map(item => (
              <option value={item} selected={year === item}>
                {item}
              </option>
            ))}
          </select>
          년
        </div>
        <div className="row__item">
          <select name="month" defaultValue={month + 1}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(item => (
              <option value={item} selected={month + 1 === item}>
                {item}
              </option>
            ))}
          </select>
          월
        </div>
        <div className="row__item">
          <select name="date" defaultValue={day}>
            {Array.from(
              { length: calculateDate.getDaysInMonth(year, month + 1) },
              (_, i) => i + 1,
            ).map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
          일
        </div>
      </div>
    </div>
  );
};

export default DateInput;
