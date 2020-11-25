import React, { useState, useEffect } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import Calendar from '../../components/Calendar';
import styles from './calendar.module.scss';
import { getDefaultMethods } from '../../api/defaultPaymentMethod';

export default function CalendarPage() {
  const [modal, setModal] = useState(false);
  const [defaultMethod, setDefaultMethod] = useState([]);

  const getData = async () => {
    const datas = await getDefaultMethods();
    setDefaultMethod(datas);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} />
      <Calendar />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
    </div>
  );
}
