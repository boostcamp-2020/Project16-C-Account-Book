import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PaymentModal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import NavButton from '../../components/Chart/NavButton';
import PieChart from '../../components/CategoryChart/PieChart';
import TableChart from '../../components/CategoryChart/TableChart';
import LineChart from '../../components/DateChart/LineChart';

import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';

import { useDateInfoData } from '../../store/DateInfo/dateInfoHook';
import { useAccountBookData } from '../../store/AccountBook/accountBookInfoHook';
import useAccountBook from '../../service/useAccountBookSetting';

import './chart.scss';

const Chart = props => {
  useLoginCheck();

  const accountBookId = useHistory().location.state;
  useAccountBook(accountBookId);

  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [chartType, setChartType] = useState('category');
  const [dataType, setDataType] = useState('지출');
  const defaultMethod = useDefaultPayment();

  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);
  const chartInfo = useAccountBookData(store =>
    store.getTransactionsForPieChart(
      DateInfo.year,
      DateInfo.month + 1,
      dataType,
    ),
  );

  const refArr = [];
  chartInfo.forEach(() => refArr.push(React.createRef()));

  return (
    <div className="chart__wrapper">
      <MenuBar
        id={accountBookId.id}
        setModal={setPaymentMethodModal}
        pageType="chart"
      />
      <NavButton chartType={chartType} setChartType={setChartType} />

      {chartInfo.length === 0 && <div className="no__data">No Data</div>}
      {chartInfo.length !== 0 && chartType === 'category' && (
        <div className="data__type">
          <label key="Income">
            <input
              type="radio"
              name="startday"
              value="수입"
              checked={dataType === '수입'}
              onChange={e => setDataType(e.target.value)}
            />
            <span className="filter__income">수입</span>
          </label>
          <label key="Spending">
            <input
              type="radio"
              name="startday"
              value="지출"
              checked={dataType === '지출'}
              onChange={e => setDataType(e.target.value)}
            />
            <span className="filter__spending">지출</span>
          </label>
        </div>
      )}
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
        <PaymentModal
          setModal={setPaymentMethodModal}
          defaultMethod={defaultMethod}
        />
      )}
    </div>
  );
};

export default Chart;
