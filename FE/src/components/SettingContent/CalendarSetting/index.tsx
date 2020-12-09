import React, { useState, useEffect } from 'react';


import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';

import DayRadioButton from './DayRadioButton';
import WeekHeader from './WeekHeader';
import ActionButton from '../../Common/ActionButton';

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

        <DayRadioButton startDay={startDay} setStartDay={setStartDay} />
        <WeekHeader startDay={startDay} />
        <div className="calendar__save__btn">
          <ActionButton type="general" content="Save" action={onClickSaveBtn} />
        </div>
      </div>
    </div>
  );
}
