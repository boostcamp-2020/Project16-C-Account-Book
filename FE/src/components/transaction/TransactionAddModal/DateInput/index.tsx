import React, { ChangeEvent } from 'react';

import calculateDate from '../../../../util/calculateDate';
import './index.scss';

const DateInput = ({ year, month, today, day, setYear, setMonth, setDay }) => {
  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLSelectElement;
      setYear(targetElement.value);
    }
  };
  const onMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLSelectElement;
      setMonth(targetElement.value);
    }
  };
  const onDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLSelectElement;
      setDay(targetElement.value);
    }
  };

  return (
    <div className="item date__input">
      <div className="indicator">날짜</div>
      <div className="row">
        <div className="row__item">
          <select name="year" defaultValue={year} onChange={onYearChange}>
            {Array.from(
              { length: 61 },
              (_, i) => i + +(today.getFullYear() - 30),
            ).map(item => (
              <option value={item} selected={year === item} key={item}>
                {item}
              </option>
            ))}
          </select>
          년
        </div>
        <div className="row__item">
          <select
            name="month"
            defaultValue={month + 1}
            onChange={onMonthChange}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(item => (
              <option value={item} selected={month + 1 === item} key={item}>
                {item}
              </option>
            ))}
          </select>
          월
        </div>
        <div className="row__item">
          <select name="date" defaultValue={day} onChange={onDayChange}>
            {Array.from(
              { length: calculateDate.getDaysInMonth(year, month + 1) },
              (_, i) => i + 1,
            ).map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          일
        </div>
      </div>
    </div>
  );
};

export default DateInput;
