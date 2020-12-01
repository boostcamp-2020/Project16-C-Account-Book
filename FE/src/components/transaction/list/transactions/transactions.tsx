/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import TransactionsOfOneDay from '../TransactionsOfOneDay';

const Transactions = () => {
  // axios로 비동기 처리
  const transactions = [
    {
      day: 1,
      category: '뷰티',
      description: '미용실',
      payment: '신한카드',
      cost: 14000,
    },
    {
      day: 1,
      category: '뷰티',
      description: '미용실',
      payment: '신한카드',
      cost: 1,
    },
    {
      day: 1,
      category: '뷰티',
      description: '미용실',
      payment: '신한카드',
      cost: 2,
    },
    {
      day: 1,
      category: '뷰티',
      description: '미용실',
      payment: '신한카드',
      cost: 3,
    },
    {
      day: 1,
      category: '뷰티',
      description: '미용실',
      payment: '신한카드',
      cost: 4,
    },
    {
      day: 2,
      category: '밥',
      description: '김선생',
      payment: '신한카드',
      cost: 5,
    },
    {
      day: 3,
      category: '쇼핑',
      description: '무신사',
      payment: '신한카드',
      cost: 163,
    },
    {
      day: 3,
      category: '쇼핑',
      description: '나이키',
      payment: '신한카드',
      cost: 421,
    },
    {
      day: 4,
      category: '저금',
      description: '카뱅',
      payment: '신한카드',
      cost: 123,
    },
    {
      day: 4,
      category: '저금',
      description: '주택청약',
      payment: '신한카드',
      cost: 231,
    },
    {
      day: 15,
      category: '쇼핑',
      description: '나이키',
      payment: '신한카드',
      cost: 22,
    },
  ];

  const days = transactions.map(value => value.day);
  const daysArr = Array.from(new Set<number>(days)).reverse();

  return (
    <>
      {daysArr.map(day => (
        <TransactionsOfOneDay day={day} transactions={transactions} />
      ))}
    </>
  );
};

export default Transactions;
