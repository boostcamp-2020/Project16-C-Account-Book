import React from 'react';
import { Line } from 'react-chartjs-2';

import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';

export default function LineChart() {
  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const YearMonthTransactions = useTransactionData(store =>
    store.getTransactionsForCalendar(DateInfo.year, DateInfo.month + 1),
  );

  const days = Object.keys(YearMonthTransactions);
  const spendingDatas = days.map(day => {
    return YearMonthTransactions[day].spending;
  });
  const incomeDatas = days.map(day => {
    return YearMonthTransactions[day].income;
  });

  const state = {
    labels: days,
    datasets: [
      {
        label: 'Spending',
        labelColor: 'red',
        fill: false,
        lineTension: 0.5,
        borderColor: '#ee4337',
        borderWidth: 2,
        borderCapStyle: 'round',
        data: spendingDatas,
        pointBackgroundColor: '#ee4337',
        pointBorderColor: '#ee4337',
        pointHoverRadius: 7,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
      },
      {
        label: 'Income',
        fill: false,
        lineTension: 0.5,
        borderColor: '#54aafc',
        borderWidth: 2,
        data: incomeDatas,
        pointBackgroundColor: '#54aafc',
        pointBorderColor: '#54aafc',
        pointHoverRadius: 7,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
      },
    ],
  };

  return (
    <Line
      data={state}
      options={{
        legend: {
          display: true,
          position: 'right',
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
        },
      }}
    />
  );
}
