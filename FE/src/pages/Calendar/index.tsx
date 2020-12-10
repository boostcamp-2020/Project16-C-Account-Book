import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PaymentModal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import TotalContent from '../../components/Calendar/TotalContent';
import Calendar from '../../components/Calendar/Calendar';
import './calendar.scss';
import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';
import useAccountBook from '../../service/useAccountBookSetting';

export default function CalendarPage() {
  const accountBookId = useHistory().location.state;

  useLoginCheck();
  useAccountBook(accountBookId);

  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const defaultMethod = useDefaultPayment();

  return (
    <div className="calendar__wrapper">
      <MenuBar
        id={accountBookId.id}
        setModal={setPaymentMethodModal}
        pageType="calendar"
      />
      <TotalContent />
      <Calendar />
      {paymentMethodModal && (
        <PaymentModal
          setModal={setPaymentMethodModal}
          defaultMethod={defaultMethod}
        />
      )}
    </div>
  );
}
