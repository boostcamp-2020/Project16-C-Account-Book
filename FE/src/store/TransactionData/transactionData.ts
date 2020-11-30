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
          _id: 'asdf',
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
          _id: 'asdf',
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
          _id: 'asdf',
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
          _id: 'asdf',
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
          _id: 'asdf',
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
          _id: 'asdf',
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
          _id: 'asdf',
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
      ],
    },

    getAllTransactions() {
      return this.accountBook.transaction;
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

    getTransactionsForPieChart(year: number, month: number) {
      const chartInfo = {};
      let accumDeg = 0;

      const datas = this.accountBook.transaction.filter(
        item =>
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
