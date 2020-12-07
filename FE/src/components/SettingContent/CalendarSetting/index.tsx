import React, { useState, useEffect } from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';

import CalendarHeader from '../../Calendar/CalendarHeader';

import { updateStartDay } from '../../../api/calendar-startday';
import './calendarSetting.scss';

export default function CalendarSetting({ accountBookId }) {
  const start = useTransactionData(store => store.accountBook.startday);

  const [startDay, setStartDay] = useState('');
  const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const onClickSaveBtn = () => {
    updateStartDay({ accountBookId, startday: startDay });
  };

  useEffect(() => {
    setStartDay(start);
  }, [start]);

  return (
    <div className="calendar__setting__container">
      <div className="calendar__setting__startday">
        <div className="calendar__setting__title">Start Day</div>
        <div className="select__startday">
          {weeks.map(day => {
            return (
              <label>
                {day}
                <input
                  type="radio"
                  name="startday"
                  value={day}
                  checked={startDay === day}
                  onChange={e => setStartDay(e.target.value)}
                />
              </label>
            );
          })}
        </div>
        <div className="start__day__title">
          <CalendarHeader startDay={startDay} />
        </div>
        <button className="calendar__setting__save" onClick={onClickSaveBtn}>
          Save
        </button>
      </div>
    </div>
  );
}
