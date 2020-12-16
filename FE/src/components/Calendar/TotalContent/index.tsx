import React from 'react';

import { useDateInfoData } from '../../../store/DateInfo/dateInfoHook';
import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';
import CommaMaker from '../../../util/commaForMoney';
import './totalContent.scss';

export default function TotalContent(props) {
  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);
  const incomeTotal = useAccountBookData(store =>
    store.getTotal(DateInfo.year, DateInfo.month + 1, '수입'),
  );
  const spendingTotal = useAccountBookData(store =>
    store.getTotal(DateInfo.year, DateInfo.month + 1, '지출'),
  );

  return (
    <div className="calendar__total__price">
      <div className="calendar__income__total">
        +{CommaMaker(incomeTotal)}원
      </div>
      <div className="calendar__spending__total">
        -{CommaMaker(spendingTotal)}원
      </div>
    </div>
  );
}
