import React, { useState, useEffect } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import Calendar from '../../components/Calendar';
import styles from './calendar.module.scss';
import { useRootData } from '../../store/PaymentMethod/paymentMethodHook';

export default function CalendarPage() {
  const [modal, setModal] = useState(false);
  const [defaultMethod, setDefaultMethod] = useState([]);

  const storeData = useRootData(store => store.defaultMethods);

  const getDefaultMethod = async () => {
    const datas = await storeData;
    setDefaultMethod(datas);
  };

  useEffect(() => {
    getDefaultMethod();
  }, []);

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} pageType="calendar" />
      <Calendar />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
    </div>
  );
}
