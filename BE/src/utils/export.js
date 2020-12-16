const fs = require('fs');
const { Parser } = require('json2csv');

const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
const randomNum = (num, devide) =>
  Math.floor((Math.random() * num) % devide) + 1;

const makeWord = () => {
  const n = randomNum(100, 15);
  let str = '';
  for (let i = 0; i < n; ++i) {
    str += chars[randomNum(100, 52) - 1];
  }
  return str;
};

const makeType = () => {
  const n = randomNum(100, 2) - 1;
  if (n) return '수입';
  else return '지출';
};
const makeDate = () => {
  const month = randomNum(100, 12);
  const date = randomNum(100, 30);
  return `2020-12-${date}`;
};

const makeCategory = () => {
  const icon = randomNum(100, 10);
  switch (icon) {
    case 1:
      return {
        name: '월급',
        icon: 1,
        type: '수입',
      };
    case 2:
      return {
        name: '용돈',
        icon: 2,
        type: '지출',
      };
    case 3:
      return {
        name: '기타수입',
        icon: 3,
        type: '수입',
      };
    case 4:
      return {
        name: '식비',
        icon: 4,
        type: '지출',
      };
    case 5:
      return {
        name: '생활',
        icon: 5,
        type: '지출',
      };
    case 6:
      return {
        name: '쇼핑/뷰티',
        icon: 6,
        type: '지출',
      };
    case 7:
      return {
        name: '교통',
        icon: 7,
        type: '지출',
      };
    case 8:
      return {
        name: '의료/건강',
        icon: 8,
        type: '지출',
      };
    case 9:
      return {
        name: '문화/여가',
        icon: 9,
        type: '지출',
      };
    case 10:
      return {
        name: '미분류',
        icon: 10,
        type: '지출',
      };
  }
};

const makepayment = () => {
  const card = randomNum(100, 9);
  switch (card) {
    case 1:
      return {
        name: 'KB',
        color: 'hsla(0, 100%, 50%, 0.93)',
      };
    case 2:
      return {
        name: 'Kakao',
        color: 'hsla(40, 100%, 50%, 0.93)',
      };
    case 3:
      return {
        name: 'SC 제일은행',
        color: 'hsla(80, 100%, 50%, 0.93)',
      };
    case 4:
      return {
        name: 'Naver',
        color: 'hsla(120, 100%, 50%, 0.93)',
      };
    case 5:
      return {
        name: 'KEB Hana',
        color: 'hsla(160, 100%, 50%, 0.93)',
      };
    case 6:
      return {
        name: 'WOORI Card',
        color: 'hsla(200, 100%, 50%, 0.93)',
      };
    case 7:
      return {
        name: 'Samsung',
        color: 'hsla(240, 100%, 50%, 0.93)',
      };
    case 8:
      return {
        name: 'Hyundai',
        color: 'hsla(280, 100%, 50%, 0.93)',
      };
    case 9:
      return {
        name: 'BC Card',
        color: 'hsla(320, 100%, 50%, 0.93)',
      };
  }
};

const init = args => {
  let transactions = [];
  for (let i = 0; i < args; ++i) {
    const transaction = {
      content: makeWord(),
      type: makeType(),
      cost: randomNum(100000, 100000),
      date: makeDate(),
      category: makeCategory(),
      payment: makepayment(),
    };
    transactions.push(transaction);
  }
  let jsonTransactions = JSON.stringify(transactions, null, 2);
  const fields = [
    'content',
    'type',
    'cost',
    'date',
    'category.name',
    'category.icon',
    'category.type',
    'payment.name',
    'payment.color',
  ];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(transactions);
  console.log(csv);
  fs.writeFileSync('transaction.csv', csv);
};

init(process.argv[2]);
