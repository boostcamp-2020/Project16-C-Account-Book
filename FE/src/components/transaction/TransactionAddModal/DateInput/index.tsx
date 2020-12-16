import React, { ChangeEvent } from 'react';
import Select, { ValueType } from 'react-select';

import calculateDate from '../../../../util/calculateDate';
import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

import './index.scss';

const DateInput = () => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
    control: provided => ({
      ...provided,
      width: '80px',
      marginRight: '5px',
    }),
    dropdownIndicator: provided => ({
      width: '20px',
    }),
  };

  const yearOptions = Array.from(
    { length: 61 },
    (_, i) => i + +(new Date().getFullYear() - 30),
  ).map(year => ({
    value: year,
    label: year,
  }));

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map(
    month => ({
      value: month,
      label: month,
    }),
  );

  const dayOptions = Array.from(
    {
      length: calculateDate.getDaysInMonth(+input.year, +(input.month + 1)),
    },
    (_, i) => i + 1,
  ).map(day => ({
    value: day,
    label: day,
  }));

  const onSelectChange = type => item => {
    setInput({ ...input, [type]: item.value });
  };

  return (
    <div className="item date__input">
      <div className="indicator">날짜</div>
      <div className="row">
        <div className="row__item">
          <Select
            value={yearOptions.find(({ value }) => value === +input.year)}
            onChange={onSelectChange('year')}
            options={yearOptions}
            styles={selectStyles}
          />
          년
        </div>
        <div className="row__item">
          <Select
            value={monthOptions.find(({ value }) => value === +input.month)}
            onChange={onSelectChange('month')}
            options={monthOptions}
            styles={selectStyles}
          />
          월
        </div>
        <div className="row__item">
          <Select
            value={dayOptions.find(({ value }) => value === +input.day)}
            onChange={onSelectChange('day')}
            options={dayOptions}
            styles={selectStyles}
          />
          일
        </div>
      </div>
    </div>
  );
};

export default DateInput;
