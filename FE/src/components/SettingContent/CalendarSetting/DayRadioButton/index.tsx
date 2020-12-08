import React from 'react';

import './dayRadioButton.scss';

export default function DayRadioButton({ startDay, setStartDay }) {
  const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return (
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
  );
}
