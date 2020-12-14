import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  updateAccountBook,
  deleteAccountBook,
} from '../../../../api/accoun-book-list';

import { useThemeData } from '../../../../store/Theme/themeHook';
import { ResponseMessage } from '../../../../util/message';

import './accountbook-card.scss';

export default function AccountBookCard({
  confirmModal,
  index,
  acbook,
  setDatas,
  datas,
}) {
  const theme = useThemeData(store => store.mode);

  const titleRef = useRef();
  const descRef = useRef();
  const titleEditRef = useRef();
  const descEditRef = useRef();

  const [mode, setMode] = useState('content');
  const history = useHistory();
  const {
    setSaveModal,
    setSaveAction,
    setUpdateData,
    setModalTitle,
  } = confirmModal;

  const onClickModify = event => {
    event.stopPropagation();

    if (mode === 'content') {
      setMode(() => 'modify');
    }

    if (mode === 'modify') {
      setMode(() => 'content');
    }

    titleEditRef.current.value = titleRef.current.textContent;
    descEditRef.current.value = descRef.current.textContent;
  };

  const onEnterEditForm = async event => {
    if (event.key === 'Enter') {
      try {
        const res = await updateAccountBook({
          accountBookId: event.target.dataset.acbookid,
          name: titleEditRef.current.value,
          description: descEditRef.current.value,
        });

        if (res.status !== ResponseMessage.success) {
          throw new Error();
        }

        const updatedAcBooks = datas.map(item => {
          if (item._id === event.target.dataset.acbookid) {
            item = {
              ...item,
              name: titleEditRef.current.value,
              description: descEditRef.current.value,
            };
          }
          return item;
        });

        setMode('content');
        setDatas(() => updatedAcBooks);
      } catch (err) {
        throw new Error();
      }
    }
  };

  const deleteProcess = async event => {
    const accountBookId = event.target.dataset.id;
    try {
      const res = await deleteAccountBook(accountBookId);
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }
      setDatas(datas.filter(acbook => acbook._id !== accountBookId));
    } catch (error) {
      throw new Error();
    }
  };

  const onClickDelete = async event => {
    event.stopPropagation();
    setModalTitle(() => '정말 이 가계부를 삭제하시겠습니까?');
    setSaveModal(() => true);
    setUpdateData(() => {
      return event;
    });
    setSaveAction(() => deleteProcess);
  };

  const linkToDetail = async event => {
    history.push({
      pathname: '/calendar',
      state: {
        id: event.target.dataset.acbookid,
      },
    });
  };

  useEffect(() => {
    titleEditRef.current.focus();
  }, [mode]);

  return (
    <div
      key={acbook._id}
      className={theme === 'dark' ? 'acbook link' : 'acbook link light'}
      data-acbookid={acbook._id}
      onClick={linkToDetail}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {mode === 'content' ? (
        <>
          <div className="ac__title" data-acbookid={acbook._id} ref={titleRef}>
            {acbook.name}
          </div>
          <div className="ac__desc" data-acbookid={acbook._id} ref={descRef}>
            {acbook.description}
          </div>
        </>
      ) : (
        <>
          <div
            className="ac__title hidden"
            data-acbookid={acbook._id}
            ref={titleRef}
          >
            {acbook.name}
          </div>
          <div
            className="ac__desc hidden"
            data-acbookid={acbook._id}
            ref={descRef}
          >
            {acbook.description}
          </div>
        </>
      )}

      {mode === 'modify' ? (
        <>
          <input
            ref={titleEditRef}
            className="acbook__title__input"
            data-acbookid={acbook._id}
            onKeyPress={onEnterEditForm}
            onClick={event => event.stopPropagation()}
          />
          <textarea
            ref={descEditRef}
            className="acbook__desc__input"
            data-acbookid={acbook._id}
            onKeyPress={onEnterEditForm}
            onClick={event => event.stopPropagation()}
          />
        </>
      ) : (
        <>
          <input
            ref={titleEditRef}
            className="acbook__title__input hidden"
            data-acbookid={acbook._id}
            onKeyPress={onEnterEditForm}
            onClick={event => event.stopPropagation()}
          />
          <textarea
            ref={descEditRef}
            className="acbook__desc__input hidden"
            data-acbookid={acbook._id}
            onKeyPress={onEnterEditForm}
            onClick={event => event.stopPropagation()}
          />
        </>
      )}

      <i className="fas fa-edit" data-id={acbook._id} onClick={onClickModify} />
      <i
        className="fas fa-trash-alt"
        data-id={acbook._id}
        onClick={onClickDelete}
      />
    </div>
  );
}
