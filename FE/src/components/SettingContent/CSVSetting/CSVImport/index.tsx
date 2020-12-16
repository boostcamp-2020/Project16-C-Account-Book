import React, { useState } from 'react';

import CSVReader from 'react-csv-reader';
import ActionButton from '../../../Common/ActionButton';
import './csvImport.scss';
import { postTransactionCSV } from '../../../../api/csv';
import { useThemeData } from '../../../../store/Theme/themeHook';
import { ResponseMessage } from '../../../../util/message';

export default function CSVImport({ accountBookId, confirmModal }) {
  const [file, setFile] = useState('');
  const theme = useThemeData(store => store.mode);
  const { setSaveModal, setSaveAction, setModalTitle } = confirmModal;

  const onClickHandler = async () => {
    try {
      const res = await postTransactionCSV(accountBookId, file);

      if (res.status !== ResponseMessage.success) {
        setModalTitle(() => 'csv파일의 data format이 올바르지 않습니다.');
        setSaveModal(() => true);
        setSaveAction(() => () => {});
        return;
      }

      setModalTitle(() => '요청하신 파일이 Import되었습니다.');
      setSaveModal(() => true);
      setSaveAction(() => () => {});
    } catch (err) {
      throw new Error();
    }
  };

  const fileChangeHandler = data => {
    const uploadFile = data;
    setFile(uploadFile);
  };

  return (
    <div
      className={
        theme === 'dark' ? 'csv__import__box' : 'csv__import__box light'
      }
    >
      <div
        className={
          theme === 'dark' ? 'csv__import__title' : 'csv__import__title light'
        }
      >
        Import
      </div>
      <div className="csv__import__desc">
        Please, select '.csv' file and click Import Button.
      </div>
      <div className="csv__import__content">
        <CSVReader
          onFileLoaded={data => fileChangeHandler(data)}
          cssInputClass={
            theme === 'dark' ? 'csv__import__input' : 'csv__import__input light'
          }
          cssClass={
            theme === 'dark'
              ? 'csv__import__filebox'
              : 'csv__import__filebox light'
          }
        />
        <div className="csv__import__btn">
          <ActionButton
            content="Import"
            action={onClickHandler}
            type="general"
          />
        </div>
      </div>
    </div>
  );
}
