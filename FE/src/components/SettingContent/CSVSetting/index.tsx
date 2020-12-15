import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './csvSetting.scss';

import CSVImport from './CSVImport';
import CSVExport from './CSVExport';

export default function CSVSetting(props) {
  const accountBookId = useHistory().location.state.id;

  return (
    <div className="csv__setting__container">
      <CSVImport />
      <CSVExport accountBookId={accountBookId} />
    </div>
  );
}
