import React, { ChangeEvent } from 'react';

import calculateDate from '../../../../util/calculateDate';
import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

import './index.scss';

const DateInput = () => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLSelectElement;
      setInput({ ...input, year: targetElement.value });
    }
  };
  const onMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLSelectElement;
      setInput({ ...input, month: targetElement.value });
    }
  };
  const onDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLSelectElement;
      setInput({ ...input, day: targetElement.value });
    }
  };

  return (
    <div className="item date__input">
      <div className="indicator">날짜</div>
      <div className="row">
        <div className="row__item">
          <select
            name="year"
            defaultValue={+input.year}
            onChange={onYearChange}
          >
            {Array.from(
              { length: 61 },
              (_, i) => i + +(new Date().getFullYear() - 30),
            ).map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          년
        </div>
        <div className="row__item">
          <select
            name="month"
            defaultValue={+input.month}
            onChange={onMonthChange}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          월
        </div>
        <div className="row__item">
          <select name="date" defaultValue={+input.day} onChange={onDayChange}>
            {Array.from(
              {
                length: calculateDate.getDaysInMonth(
                  +input.year,
                  +(input.month + 1),
                ),
              },
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
