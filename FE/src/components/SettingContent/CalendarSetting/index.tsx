import React, { useState, useEffect } from 'react';

import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';

import CalendarHeader from '../../Calendar/CalendarHeader';

import { updateStartDay } from '../../../api/calendar-startday';
import './calendarSetting.scss';

export default function CalendarSetting({
  accountBookId,
  setSaveModal,
  setUpdateData,
  setSaveAction,
}) {
  const start = useAccountBookData(store => store.accountBook.startday);

  const [startDay, setStartDay] = useState('');
  const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const onClickSaveBtn = () => {
    setSaveModal(() => true);
    setUpdateData(() => {
      return { accountBookId, startday: startDay };
    });
    setSaveAction(() => updateStartDay);
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
              <label key={day}>
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
        <table className="start__day__title">
          <thead>
            <tr>
              <CalendarHeader startDay={startDay} />
            </tr>
          </thead>
        </table>
        <button className="calendar__setting__save" onClick={onClickSaveBtn}>
          Save
        </button>
      </div>
    </div>
  );
}
