import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PaymentModal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import TotalContent from '../../components/Calendar/TotalContent';
import Calendar from '../../components/Calendar/Calendar';
import DetailModal from '../../components/Calendar/DetailModal';
import './calendar.scss';
import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';
import useAccountBook from '../../service/useAccountBookSetting';
import { useThemeData } from '../../store/Theme/themeHook';

export default function CalendarPage() {
  const history = useHistory();
  const accountBookId = useLoginCheck();

  const theme = useThemeData(store => store.mode);

  const isWrongAccess = useAccountBook(accountBookId);
  if (!isWrongAccess) {
    history.push('/');
    return null;
  }

  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const defaultMethod = useDefaultPayment();

  return (
    <div
      className={
        theme === 'dark' ? 'calendar__wrapper' : 'calendar__wrapper light'
      }
    >
      <MenuBar
        id={accountBookId.id}
        setModal={setPaymentMethodModal}
        pageType="calendar"
      />
      <TotalContent />
      <Calendar setDetailModal={setDetailModal} />
      {paymentMethodModal && (
        <PaymentModal
          setModal={setPaymentMethodModal}
          defaultMethod={defaultMethod}
        />
      )}
      {detailModal && <DetailModal setDetailModal={setDetailModal} />}
    </div>
  );
}
