export const createStore = () => {
  const store = {
    accountBook: {
      _id: 'abcdefg',
      name: 'test account',
      description: 'mock account book',
      category: [
        {
          _id: '123456',
          name: 'shopping',
          icon: 1,
        },
        {
          _id: '234567',
          name: 'food',
          icon: 2,
        },
      ],
      payment: [
        {
          _id: 'acacacac',
          card: 1,
          description: 'naver',
        },
        {
          _id: 'adadadad',
          card: 2,
          description: 'kakao',
        },
      ],

      user: [1, 2, 3, 4],
      transaction: [
        {
          _id: 'a',
          content: 'test',
          type: '지출',
          cost: 10000,
          date: '2020-11-29',
          category: {
            name: 'shopping',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'b',
          content: 'test2',
          type: '지출',
          cost: 20000,
          date: '2020-11-29',
          category: {
            name: 'food',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'c',
          content: 'test3',
          type: '지출',
          cost: 30000,
          date: '2020-11-29',
          category: {
            name: 'life',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'd',
          content: 'test4',
          type: '지출',
          cost: 40000,
          date: '2020-11-29',
          category: {
            name: 'etc',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },

        {
          _id: 'e',
          content: 'test4',
          type: '지출',
          cost: 50000,
          date: '2020-11-29',
          category: {
            name: 'etc',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'f',
          content: 'test4',
          type: '지출',
          cost: 1000,
          date: '2020-10-29',
          category: {
            name: 'etc',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'g',
          content: 'test4',
          type: '지출',
          cost: 10000,
          date: '2020-10-29',
          category: {
            name: 'shopping',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'h',
          content: '옷',
          type: '지출',
          cost: 1000000,
          date: '2020-12-01',
          category: {
            name: '쇼핑',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'i',
          content: '치킨',
          type: '지출',
          cost: 20000,
          date: '2020-12-01',
          category: {
            name: '식비',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'j',
          content: '정기 교통비',
          type: '지출',
          cost: 30000,
          date: '2020-12-01',
          category: {
            name: '교통',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'k',
          content: '영화보기',
          type: '지출',
          cost: 40000,
          date: '2020-12-01',
          category: {
            name: '여가',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'l',
          content: '정기용돈',
          type: '수입',
          cost: 500000000,
          date: '2020-12-01',
          category: {
            name: '용돈',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
        {
          _id: 'm',
          content: '정기월급',
          type: '수입',
          cost: 400000000,
          date: '2020-12-01',
          category: {
            name: '월급',
            icon: 1,
          },
          payment: {
            card: 1,
            description: 'naver',
          },
        },
      ],
    },

    getAllTransactions() {
      return this.accountBook.transaction;
    },

    getTransactionsByYearMonth(year: number, month: number) {
      const yearMonthDatas = this.accountBook.transaction.filter(
        item =>
          year === Number(item.date.split('-')[0]) &&
          month === Number(item.date.split('-')[1]),
      );

      return yearMonthDatas;
    },
    getTransactionsForCalendar(year: number, month: number) {
      const yearMonthDatas = this.accountBook.transaction.filter(
        item =>
          year === Number(item.date.split('-')[0]) &&
          month === Number(item.date.split('-')[1]),
      );

      const priceSumData = {};

      yearMonthDatas.forEach(item => {
        const date = String(Number(item.date.split('-')[2]));
        if (!priceSumData.hasOwnProperty(String(date))) {
          item.type === '지출'
            ? (priceSumData[`${date}`] = { spending: item.cost, income: 0 })
            : (priceSumData[`${date}`] = { income: item.cost, spendiing: 0 });
        } else {
          item.type === '지출'
            ? (priceSumData[`${date}`].spending += item.cost)
            : (priceSumData[`${date}`].income += item.cost);
        }
      });

      return priceSumData;
    },
    getSpecificTransactions(year: number, month: number, day: number) {
      const specificDatas = this.accountBook.transaction.filter(
        item =>
          year === Number(item.date.split('-')[0]) &&
          month === Number(item.date.split('-')[1]) &&
          day === Number(item.date.split('-')[2]),
      );
      return specificDatas;
    },

    getSpendingTotal(year, month) {
      let sum = 0;
      this.accountBook.transaction.forEach(item => {
        if (
          item.type === '지출' &&
          Number(item.date.split('-')[0]) === year &&
          Number(item.date.split('-')[1]) === month
        ) {
          sum += item.cost;
        }
      });

      return sum;
    },
    getIncomeTotal(year, month) {
      let sum = 0;

      this.accountBook.transaction.forEach(item => {
        if (
          item.type === '수입' &&
          Number(item.date.split('-')[0]) === year &&
          Number(item.date.split('-')[1]) === month
        ) {
          sum += item.cost;
        }
      });

      return sum;
    },

    getTransactionsForPieChart(year: number, month: number) {
      const chartInfo = {};
      let accumDeg = 0;

      const datas = this.accountBook.transaction.filter(
        item =>
          item.type === '지출' &&
          year === Number(item.date.split('-')[0]) &&
          month === Number(item.date.split('-')[1]),
      );

      datas.forEach(item => {
        if (item.category.name in chartInfo) {
          chartInfo[item.category.name].cost += item.cost;
        } else {
          chartInfo[item.category.name] = {};
          chartInfo[item.category.name].cost = item.cost;
        }
      });

      for (const key in chartInfo) {
        chartInfo[key].percent =
          (100 * chartInfo[key].cost) / this.getSpendingTotal(year, month);
      }

      for (const key in chartInfo) {
        if (accumDeg === 0) {
          chartInfo[key].startPoint = 0;
          accumDeg +=
            360 * (chartInfo[key].cost / this.getSpendingTotal(year, month));
        } else {
          chartInfo[key].startPoint = accumDeg;
          accumDeg +=
            360 * (chartInfo[key].cost / this.getSpendingTotal(year, month));
        }
      }

      const chartInfoArray = [];

      for (const key in chartInfo) {
        chartInfo[key].category = key;
        chartInfoArray.push(chartInfo[key]);
      }

      return chartInfoArray;
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;