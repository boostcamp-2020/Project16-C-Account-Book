import React, { useState, useEffect } from 'react';

import ActionButton from '../../../Common/ActionButton';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import './inviteCode.scss';

export default function InviteCode(props) {
  const code = useAccountBookData(store => store.accountBook.code);
  const [codeContent, setCodeContet] = useState(false);

  const onClickGetCode = () => {
    setCodeContet(true);
  };

  return (
    <div className="invite__code__box">
      <ActionButton
        type="large"
        content="Invite Code"
        action={onClickGetCode}
      />

      {codeContent && <div className="invite__code__content">{code}</div>}
    </div>
  );
}
