import React, { useState } from 'react';

import ActionButton from '../../../Common/ActionButton';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { useThemeData } from '../../../../store/Theme/themeHook';
import { getInviteCode } from '../../../../api/invite-code';
import './inviteCode.scss';
import { ResponseMessage } from '../../../../util/message';

export default function InviteCode(props) {
  const theme = useThemeData(store => store.mode);
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const [codeVisible, setCodeVisible] = useState(false);
  const [codeContent, setCodeContet] = useState('');
  const [clipBoardMessage, setClipBoardMessage] = useState(false);

  const onClickGetCode = async () => {
    try {
      const res = await getInviteCode({ accountBookId });
      console.log(res);
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }

      setCodeContet(res.data);
      setCodeVisible(() => true);
    } catch (error) {
      throw new Error();
    }
  };

  const onClicClipBoard = () => {
    const oneTimeDom = document.createElement('textarea');
    oneTimeDom.value = codeContent;
    document.body.appendChild(oneTimeDom);
    oneTimeDom.select();
    document.execCommand('copy');
    document.body.removeChild(oneTimeDom);
    setClipBoardMessage(true);
  };

  return (
    <div
      className={
        theme === 'dark' ? 'invite__code__box' : 'invite__code__box light'
      }
    >
      <div
        className={
          theme === 'dark' ? 'invite__code__title' : 'invite__code__title light'
        }
      >
        Invite Code
      </div>
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
          <div className="content__and__clipboard">
            <div className="invite__code">{codeContent}</div>
            <i className="far fa-clipboard" onClick={onClicClipBoard} />
          </div>
        )}
      </div>
      {clipBoardMessage && (
        <div className="clip__board__message">클립보드에 복사되었습니다.</div>
      )}
    </div>
  );
}
