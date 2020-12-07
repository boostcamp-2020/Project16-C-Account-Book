import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import {
  getAccountBookList,
  updateAccountBook,
  deleteAccountBook,
} from '../../../api/accoun-book-list';

import { findSibling } from '../../../util/findSibling';
import './accountBookList.scss';

export const AccountBookList = ({ datas, setDatas }) => {
  const history = useHistory();

  const setAccountBookList = async () => {
    const accountBooks = await getAccountBookList();
    accountBooks.data.sort((a, b) => {
      return b.transactions.length - a.transactions.length;
    });
    setDatas(accountBooks.data);
  };

  const onClickModify = event => {
    const title = findSibling(event.target, 'ac__title');
    const desc = findSibling(event.target, 'ac__desc');
    const titleEdit = findSibling(event.target, 'acbook__title__input');
    const descEdit = findSibling(event.target, 'acbook__desc__input');

    titleEdit.value = title.textContent;
    descEdit.value = desc.textContent;

    title.classList.toggle('hidden');
    desc.classList.toggle('hidden');
    titleEdit.classList.toggle('hidden');
    descEdit.classList.toggle('hidden');
    titleEdit.focus();
  };

  const onEnterEditForm = async event => {
    const title = findSibling(event.target, 'ac__title');
    const desc = findSibling(event.target, 'ac__desc');
    const titleEdit = findSibling(event.target, 'acbook__title__input');
    const descEdit = findSibling(event.target, 'acbook__desc__input');

    if (event.key === 'Enter') {
      await updateAccountBook({
        accountBookId: event.target.dataset.acbookid,
        name: titleEdit.value,
        description: descEdit.value,
      });

      const updatedAcBooks = datas.map(item => {
        if (item._id === event.target.dataset.acbookid) {
          item = {
            ...item,
            name: titleEdit.value,
            description: descEdit.value,
          };
          return item;
        }
      });

      setDatas(() => updatedAcBooks);
      title.classList.toggle('hidden');
      desc.classList.toggle('hidden');
      titleEdit.classList.toggle('hidden');
      descEdit.classList.toggle('hidden');
    }
  };

  const linkToDetail = async event => {
    if (event.target.classList.contains('link')) {
      history.push({
        pathname: '/calendar',
        state: {
          id: event.target.dataset.acbookid,
        },
      });
    }
  };

  const onClickDelete = async event => {
    const accountBookId = event.target.dataset.id;
    const res = await deleteAccountBook(accountBookId);

    setDatas(datas.filter(data => data._id !== accountBookId));
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
          <div className="ac__title link" data-acbookid={data._id}>
            {data.name}
          </div>
          <div className="ac__desc link" data-acbookid={data._id}>
            {data.description}
          </div>

          <input
            className="acbook__title__input hidden"
            data-acbookid={data._id}
            onKeyPress={onEnterEditForm}
          />
          <textarea
            className="acbook__desc__input hidden"
            data-acbookid={data._id}
            onKeyPress={onEnterEditForm}
          />

          <i
            className="fas fa-edit"
            data-id={data._id}
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
