import React from 'react';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import CommaMaker from '../../../util/commaForMoney';
import ChartColorCollections from '../../../util/chartColorCollection';
import './tableChart.scss';

export default function TableChart({ chartInfo }) {
  const DateInfo = useRootData(store => store.nowCalendarInfo);

  return (
    <div className="pie__table">
      {chartInfo &&
        chartInfo.map((el, i) => (
          <div
            className="stat__unit"
            key={DateInfo.year + DateInfo.month + el.category}
          >
            <span className="stat__category">{el.category}</span>
            <span className="stat__percent"> {el.percent.toFixed(1)}%</span>
            <span className="stat__background">
              <span
                className="stat__color"
                style={{
                  display: 'inline-block',
                  width: `${Math.floor(el.percent)}%`,
                  height: '20px',
                  backgroundColor: `${ChartColorCollections[i]}`,
                }}
              />
            </span>
            <span className="stat__price"> {CommaMaker(el.cost)}원</span>
          </div>
        ))}
    </div>
  );
}
