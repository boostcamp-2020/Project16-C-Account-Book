import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import {
  getAccountBookList,
  updateAccountBook,
  deleteAccountBook,
} from '../../../api/accoun-book-list';

import { ResponseMessage } from '../../../util/message';

import './index.scss';

export const AccountBookList = ({ datas, setDatas, confirmModal }) => {
  const {
    setSaveModal,
    setSaveAction,
    setUpdateData,
    setModalTitle,
  } = confirmModal;

  const history = useHistory();

  const setAccountBookList = async () => {
    try {
      const accountBooks = await getAccountBookList();

      if (accountBooks.status !== ResponseMessage.success) {
        throw new Error();
      }

      accountBooks.data.sort((a, b) => {
        return b.transactions.length - a.transactions.length;
      });
      setDatas(accountBooks.data);
    } catch (err) {
      throw new Error();
    }
  };

  const titleRef = [];
  const descRef = [];
  const titleEditRef = [];
  const descEditRef = [];
  datas.forEach(() => {
    titleRef.push(React.createRef());
    descRef.push(React.createRef());
    titleEditRef.push(React.createRef());
    descEditRef.push(React.createRef());
  });

  const onClickModify = event => {
    event.stopPropagation();
    const index = event.target.dataset.turn;

    titleEditRef[index].current.value = titleRef[index].current.textContent;
    descEditRef[index].current.value = descRef[index].current.textContent;

    titleRef[index].current.classList.toggle('hidden');
    descRef[index].current.classList.toggle('hidden');
    titleEditRef[index].current.classList.toggle('hidden');
    descEditRef[index].current.classList.toggle('hidden');
    titleEditRef[index].current.focus();
  };

  const onEnterEditForm = async event => {
    const index = event.target.dataset.turn;
    if (event.key === 'Enter') {
      try {
        const res = await updateAccountBook({
          accountBookId: event.target.dataset.acbookid,
          name: titleEditRef[index].current.value,
          description: descEditRef[index].current.value,
        });

        if (res.status !== ResponseMessage.success) {
          throw new Error();
        }

        const updatedAcBooks = datas.map(item => {
          if (item._id === event.target.dataset.acbookid) {
            item = {
              ...item,
              name: titleEditRef[index].current.value,
              description: descEditRef[index].current.value,
            };
          }
          return item;
        });
        titleRef[index].current.classList.toggle('hidden');
        descRef[index].current.classList.toggle('hidden');
        titleEditRef[index].current.classList.toggle('hidden');
        descEditRef[index].current.classList.toggle('hidden');
        setDatas(() => updatedAcBooks);
      } catch (err) {
        throw new Error();
      }
    }
  };

  const linkToDetail = async event => {
    history.push({
      pathname: '/calendar',
      state: {
        id: event.target.dataset.acbookid,
      },
    });
  };

  const deleteProcess = async event => {
    const accountBookId = event.target.dataset.id;
    try {
      const res = await deleteAccountBook(accountBookId);
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }
      setDatas(datas.filter(data => data._id !== accountBookId));
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

  useEffect(() => {
    setAccountBookList();
  }, []);

  return (
    <>
      {datas.map((data, index) => (
        <div
          key={data._id}
          className="acbook link"
          data-acbookid={data._id}
          onClick={linkToDetail}
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div
            className="ac__title link"
            data-acbookid={data._id}
            data-turn={index}
            ref={titleRef[index]}
          >
            {data.name}
          </div>
          <div
            className="ac__desc link"
            data-acbookid={data._id}
            data-turn={index}
            ref={descRef[index]}
          >
            {data.description}
          </div>

          <input
            className="acbook__title__input hidden"
            data-acbookid={data._id}
            data-turn={index}
            onKeyPress={onEnterEditForm}
            ref={titleEditRef[index]}
            onClick={event => event.stopPropagation()}
          />
          <textarea
            className="acbook__desc__input hidden"
            data-acbookid={data._id}
            data-turn={index}
            onKeyPress={onEnterEditForm}
            ref={descEditRef[index]}
            onClick={event => event.stopPropagation()}
          />

          <i
            className="fas fa-edit"
            data-id={data._id}
            data-turn={index}
            onClick={onClickModify}
          />
          <i
            className="fas fa-trash-alt"
            data-id={data._id}
            onClick={onClickDelete}
          />
        </div>
      ))}
    </>
  );
};

export default AccountBookList;
