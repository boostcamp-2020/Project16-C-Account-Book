import React, { useState } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import NavButton from '../../components/Chart/NavButton';
import PieChart from '../../components/CategoryChart/PieChart';
import TableChart from '../../components/CategoryChart/TableChart';
import LineChart from '../../components/DateChart/LineChart';

import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';

import { useRootData } from '../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../store/TransactionData/transactionInfoHook';

import './chart.scss';

const Chart = props => {
  useLoginCheck();
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [chartType, setChartType] = useState('category');
  const defaultMethod = useDefaultPayment();

  const DateInfo = useRootData(store => store.nowCalendarInfo);
  const ChartInfo = useTransactionData(
    store => store.getTransactionsForPieChart,
  );

  const chartInfo = ChartInfo(DateInfo.year, DateInfo.month + 1);
  const refArr = [];
  chartInfo.forEach(() => refArr.push(React.createRef()));

  return (
    <div className="chart__wrapper">
      <MenuBar setModal={setPaymentMethodModal} pageType="chart" />
      <NavButton chartType={chartType} setChartType={setChartType} />

      {chartInfo.length === 0 && <div className="no__data">No Data</div>}

      {chartType === 'category' && chartInfo.length !== 0 && (
        <div className="category__charts">
          <PieChart chartInfo={chartInfo} refArr={refArr} />
          <TableChart chartInfo={chartInfo} />
        </div>
      )}
      {chartType === 'date' && chartInfo.length !== 0 && (
        <div className="date__charts">
          <LineChart />
        </div>
      )}
      {paymentMethodModal && (
        <Modal setModal={setPaymentMethodModal} defaultMethod={defaultMethod} />
      )}
    </div>
  );
};

export default Chart;
