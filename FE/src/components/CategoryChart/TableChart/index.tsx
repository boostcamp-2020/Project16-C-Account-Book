import React from 'react';

import { useDateInfoData } from '../../../store/DateInfo/dateInfoHook';
import { useThemeData } from '../../../store/Theme/themeHook';
import CommaMaker from '../../../util/commaForMoney';
import ChartColorCollections from '../../../util/chartColorCollection';
import './tableChart.scss';

export default function TableChart({ chartInfo }) {
  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);
  const theme = useThemeData(store => store.mode);

  return (
    <div className={theme == 'dark' ? 'pie__table' : 'pie__table light'}>
      {chartInfo &&
        chartInfo.map((el, i) => (
          <div
            className={theme === 'dark' ? 'stat__unit' : 'stat__unit light'}
            key={DateInfo.year + DateInfo.month + el.category}
          >
            <span
              className={
                theme === 'dark' ? 'stat__category' : 'stat__category light'
              }
            >
              {el.category}
            </span>
            <span
              className={
                theme === 'dark' ? 'stat__percent' : 'stat__percent light'
              }
            >
              {' '}
              {el.percent.toFixed(1)}%
            </span>
            <span
              className={
                theme === 'dark' ? 'stat__background' : 'stat__background light'
              }
            >
              <span
                className={
                  theme === 'dark' ? 'stat__color' : 'stat__color light'
                }
                style={{
                  display: 'inline-block',
                  width: `${Math.floor(el.percent)}%`,
                  height: '20px',
                  backgroundColor: `${ChartColorCollections[i]}`,
                }}
              />
            </span>
            <span
              className={theme === 'dark' ? 'stat__price' : 'stat__price light'}
            >
              {' '}
              {CommaMaker(el.cost)}원
            </span>
          </div>
        ))}
    </div>
  );
}
