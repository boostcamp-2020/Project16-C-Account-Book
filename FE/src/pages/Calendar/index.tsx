import React, { useState, useEffect } from 'react';

import Calendar from '../../components/Calendar';
import styles from './calendar.module.scss';
import { getDefaultMethods } from '../../api/defaultPaymentMethod';

export default function CalendarPage() {
  const getData = async () => {
    const datas = await getDefaultMethods();
    setDefaultMethod(datas);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Calendar />
    </div>
  );
}
