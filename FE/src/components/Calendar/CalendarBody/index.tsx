import React from 'react';
import { v4 } from 'uuid';
import CalculateDate from '../../../util/calculateDate';
import { useDateInfoData } from '../../../store/DateInfo/dateInfoHook';
import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';
import { useThemeData } from '../../../store/Theme/themeHook';
import CommaMaker from '../../../util/commaForMoney';

import { StartDayMap, CalendarBodyTable } from '../../../util/calendarTemplate';
import './calendarBody.scss';

export default function CalendarBody() {
  const theme = useThemeData(store => store.mode);
  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);

  const YearMonthTransactions = useAccountBookData(store =>
    store.getTransactionsForCalendar(DateInfo.year, DateInfo.month + 1),
  );

  const startDay = useAccountBookData(store => store.accountBook.startday);

  const yy = DateInfo.year;
  const mm = DateInfo.month;
  const firstDay = CalculateDate.getFirstDay(yy, mm);
  const lastDay = CalculateDate.getLastDay(yy, mm);
  let markToday;

  if (
    mm === CalculateDate.today.getMonth() &&
    yy === CalculateDate.today.getFullYear()
  ) {
    markToday = CalculateDate.today.getDate();
  }

  let startCount;
  const countDay = 0;

  const tableInfo = CalendarBodyTable[StartDayMap[startDay]];

  return (
    <>
      {tableInfo &&
        tableInfo.map((item, horizon) => {
          return (
            <tr key={horizon}>
              {item.map(day => {
                if (horizon === 0 && !startCount && day === firstDay.getDay()) {
                  startCount = 1;
                }
                if (!startCount) {
                  return <td className="td__hidden" key={v4()} />;
                }

                ++countDay;

                if (countDay === lastDay.getDate()) {
                  startCount = 0;
                }

                return (
                  <>
                    {markToday && markToday === countDay ? (
                      <td
                        key={`day${countDay}`}
                        className={
                          theme === 'dark'
                            ? `day ${countDay}`
                            : `day ${countDay} light`
                        }
                        data-date={countDay}
                      >
                        <div className="today" data-date={countDay}>
                          {countDay}
                        </div>
                        {YearMonthTransactions[String(countDay)] && (
                          <>
                            <div className="income__info" data-date={countDay}>
                              +
                              {CommaMaker(
                                YearMonthTransactions[String(countDay)].income,
                              )}
                            </div>
                            <div
                              className="spending__info"
                              data-date={countDay}
                            >
                              -
                              {CommaMaker(
                                YearMonthTransactions[String(countDay)]
                                  .spending,
                              )}
                            </div>
                          </>
                        )}
                      </td>
                    ) : (
                      <td
                        key={`day${countDay}`}
                        className={
                          theme === 'dark'
                            ? `day ${countDay}`
                            : `day ${countDay} light`
                        }
                        data-date={countDay}
                      >
                        {countDay}
                        {YearMonthTransactions[String(countDay)] && (
                          <>
                            <div className="income__info" data-date={countDay}>
                              +
                              {CommaMaker(
                                YearMonthTransactions[String(countDay)].income,
                              )}
                            </div>
                            <div
                              className="spending__info"
                              data-date={countDay}
                            >
                              -
                              {CommaMaker(
                                YearMonthTransactions[String(countDay)]
                                  .spending,
                              )}
                            </div>
                          </>
                        )}
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
