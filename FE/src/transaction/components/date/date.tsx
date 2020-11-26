import React from 'react';
import styles from './date.module.scss';

import Year from './year/year';
import Month from './month/month';

const Date = props => {
  return (
    <div className={styles.wrapper}>
      <Year />
      <Month />
    </div>
  );
};

export default Date;
