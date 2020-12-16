import React from 'react';
import CalendarHeader from '../../../Calendar/CalendarHeader';

import './weekHeader.scss';

export default function WeekHeader({ startDay }) {
  return (
    <table className="start__day__header">
      <thead>
        <tr>
          <CalendarHeader startDay={startDay} />
        </tr>
      </thead>
    </table>
  );
}
