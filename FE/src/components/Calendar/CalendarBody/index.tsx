import React from 'react';
import { v4 } from 'uuid';
import CalculateDate from '../../../util/calculateDate';
import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import CommaMaker from '../../../util/commaForMoney';
import './calendarBody.scss';

export default function CalendarBody() {
  const DateInfo = useRootData(store => store.nowCalendarInfo);

  const YearMonthTransactions = useTransactionData(store =>
    store.getTransactionsForCalendar(DateInfo.year, DateInfo.month + 1),
  );

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
          <tr key={horizon}>
            {item.map((day, index) => {
              if (horizon === 0 && !startCount && index === firstDay.getDay()) {
                startCount = 1;
              }
              if (!startCount) {
                return <td key={v4()} />;
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
                      className={`day ${countDay}`}
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
                          <div className="spending__info" data-date={countDay}>
                            -
                            {CommaMaker(
                              YearMonthTransactions[String(countDay)].spending,
                            )}
                          </div>
                        </>
                      )}
                    </td>
                  ) : (
                    <td
                      key={`day${countDay}`}
                      className={`day ${countDay}`}
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
                          <div className="spending__info" data-date={countDay}>
                            -
                            {CommaMaker(
                              YearMonthTransactions[String(countDay)].spending,
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
