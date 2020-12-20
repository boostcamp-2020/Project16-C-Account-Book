import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import HeaderButton from '../../HeaderButton';

import './header-buttons.scss';

export default function HeaderButtons({ id, pageType, setModal }) {
  const history = useHistory();
  const onClickIcon = useCallback(event => {
    history.push({
      pathname: event.target.dataset.type,
      state: {
        id,
      },
    });
  }, []);

  const onClickPayment = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <>
      {pageType === 'transaction' ? (
        <HeaderButton
          buttonType="transaction"
          isChecked
          onClickIcon={onClickIcon}
        />
      ) : (
        <HeaderButton
          buttonType="transaction"
          isChecked={false}
          onClickIcon={onClickIcon}
        />
      )}
      {pageType === 'calendar' ? (
        <HeaderButton
          buttonType="calendar"
          isChecked
          onClickIcon={onClickIcon}
        />
      ) : (
        <HeaderButton
          buttonType="calendar"
          isChecked={false}
          onClickIcon={onClickIcon}
        />
      )}
      {pageType === 'chart' ? (
        <HeaderButton buttonType="chart" isChecked onClickIcon={onClickIcon} />
      ) : (
        <HeaderButton
          buttonType="chart"
          isChecked={false}
          onClickIcon={onClickIcon}
        />
      )}

      <HeaderButton
        buttonType="paymentMethod"
        isChecked={false}
        onClickIcon={onClickPayment}
      />
    </>
  );
}
