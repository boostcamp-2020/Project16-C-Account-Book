import React, { useState, useEffect } from 'react';

import ActionButton from '../../../Common/ActionButton';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { getInviteCode } from '../../../../api/invite-code';
import './inviteCode.scss';

export default function InviteCode(props) {
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const [codeVisible, setCodeVisible] = useState(true);
  const [codeContent, setCodeContet] = useState('');

  const onClickGetCode = async () => {
    const res = await getInviteCode({ accountBookId });

    setCodeContet(res.data.code);
    setCodeVisible(() => true);
  };

  return (
    <div className="invite__code__box">
      <div className="invite__code__title">Invite Code</div>
      <div className="invite__code__desc">
        You can get invite code to invite someone.
      </div>

      <div className="invite__code__content">
        <div className="get__code__button">
          <ActionButton
            type="large"
            content="Invite Code"
            action={onClickGetCode}
          />
        </div>

        {codeVisible && (
          <div className="invite__code__content">{codeContent}</div>
        )}
      </div>
    </div>
  );
}
