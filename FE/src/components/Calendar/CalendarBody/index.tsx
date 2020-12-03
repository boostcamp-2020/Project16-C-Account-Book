import React from 'react';
import CalculateDate from '../../../util/calculateDate';
import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/TransactionData/transactionInfoHook';
import CommaMaker from '../../../util/commaForMoney';
import './calendarBody.scss';

export default function CalendarBody({ year, month }) {
  const DateInfo = useRootData(store => store.nowCalendarInfo);

  const YearMonthTransactions = useTransactionData(store =>
    store.getTransactionsForCalendar(DateInfo.year, DateInfo.month + 1),
  );

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
                      {YearMonthTransactions[String(countDay)] && (
                        <>
                          <div className="income__info" data-date={countDay}>
                            +
                            {CommaMaker(
                              YearMonthTransactions[String(countDay)].income,
                            )}
                            원
                          </div>
                          <div className="spending__info" data-date={countDay}>
                            -
                            {CommaMaker(
                              YearMonthTransactions[String(countDay)].spending,
                            )}
                            원
                          </div>
                        </>
                      )}
                    </td>
                  ) : (
                    <td className={`day ${countDay}`} data-date={countDay}>
                      {countDay}
                      {YearMonthTransactions[String(countDay)] && (
                        <>
                          <div className="income__info" data-date={countDay}>
                            +
                            {CommaMaker(
                              YearMonthTransactions[String(countDay)].income,
                            )}
                            원
                          </div>
                          <div className="spending__info" data-date={countDay}>
                            -
                            {CommaMaker(
                              YearMonthTransactions[String(countDay)].spending,
                            )}
                            원
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
