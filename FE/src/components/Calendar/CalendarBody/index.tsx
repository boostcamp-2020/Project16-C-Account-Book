import React from 'react';
import CalculateDate from '../../../util/calculateDate';

export default function CalendarBody({ year, month }) {
  const yy = year;
  const mm = month;
  const firstDay = CalculateDate.getFirstDay(yy, mm);
  const lastDay = CalculateDate.getLastDay(yy, mm);
  let markToday;

  if (
    mm === CalculateDate.today.getMonth() &&
    yy === CalculateDate.today.getFullYear()
  ) {
    markToday = CalculateDate.today.getDate();
  }

  const trtd = '';
  let startCount;
  const countDay = 0;

  const tableInfo = [
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
  ];

  return (
    <>
      {tableInfo.map((item, horizon) => {
        return (
          <tr>
            {item.map((day, index) => {
              if (horizon === 0 && !startCount && index === firstDay.getDay()) {
                startCount = 1;
              }
              if (!startCount) {
                return <td />;
              }

              ++countDay;

              if (countDay === lastDay.getDate()) {
                startCount = 0;
              }

              return (
                <>
                  {markToday && markToday === countDay ? (
                    <td className={`day ${countDay}`} data-date={countDay}>
                      <div className="today" data-date={countDay}>
                        {countDay}
                      </div>
                    </td>
                  ) : (
                    <td className={`day ${countDay}`} data-date={countDay}>
                      {countDay}
                    </td>
                  )}
                </>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
