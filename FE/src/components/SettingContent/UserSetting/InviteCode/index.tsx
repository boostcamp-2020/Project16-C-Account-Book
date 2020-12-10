import React, { useState, useEffect } from 'react';

import ActionButton from '../../../Common/ActionButton';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { getInviteCode } from '../../../../api/invite-code';
import './inviteCode.scss';

export default function InviteCode(props) {
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const [codeVisible, setCodeVisible] = useState(false);
  const [codeContent, setCodeContet] = useState('');

  const onClickGetCode = async () => {
    const res = await getInviteCode({ accountBookId });
    setCodeContet(res.data);
    setCodeVisible(() => true);
  };

  return (
    <div className="invite__code__box">
      <ActionButton
        type="large"
        content="Invite Code"
        action={onClickGetCode}
      />

      {codeVisible && (
        <div className="invite__code__content">{codeContent}</div>
      )}
    </div>
  );
}
