import React, { useState } from 'react';

import PaymentModal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import TotalContent from '../../components/Calendar/TotalContent';
import Calendar from '../../components/Calendar/Calendar';
import './calendar.scss';
import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';

export default function CalendarPage() {
  useLoginCheck();
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const defaultMethod = useDefaultPayment();

  return (
    <div className="calendar__wrapper">
      <MenuBar setModal={setPaymentMethodModal} pageType="calendar" />
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
