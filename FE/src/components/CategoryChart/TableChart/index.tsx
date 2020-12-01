import React from 'react';
import { v4 } from 'uuid';
import { useRootData } from '../../../store/DateInfo/dateInfoHook';
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
            key={v4()}
            // key={DateInfo.year + DateInfo.month + el.category}
          >
            <span className="stat__category">{el.category}</span>
            <span className="stat__percent"> {Math.floor(el.percent)}%</span>
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
            <span className="stat__price"> {el.cost}원</span>
          </div>
        ))}
    </div>
  );
}
