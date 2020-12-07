import React from 'react';

import './calendarSetting.scss';

export default function CalendarSetting(props) {
  return (
    <div className="calendar__setting__container">
      <div className="calendar__setting__startday">
        <div className="calendar__setting__title">Start Day</div>
        <div className="select__startday">
          <label>
            SUN
            <input type="radio" id="sunday" name="startday" />
          </label>

          <label>
            MON
            <input type="radio" id="monday" name="startday" />
          </label>

          <label>
            TUE
            <input type="radio" id="tuesday" name="startday" />
          </label>

          <label>
            WED
            <input type="radio" id="wednesday" name="startday" />
          </label>

          <label>
            THU
            <input type="radio" id="thursday" name="startday" />
          </label>

          <label>
            FRI
            <input type="radio" id="friday" name="startday" />
          </label>

          <label>
            SAT
            <input type="radio" id="saturday" name="startday" />
          </label>
        </div>
      </div>
      <div className="calendar__setting__GMT">
        <div className="calendar__setting__title">GMT</div>
      </div>
    </div>
  );
}
