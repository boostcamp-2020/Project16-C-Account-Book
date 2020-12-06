import { getTargetAccountBook } from '../../api/accoun-book-list';

export const createStore = () => {
  const store = {
    accountBook: {
      _id: null,
      name: null,
      description: null,
      category: [],
      payments: [],
      user: [],
      transactions: [],
    },

    filteredTransactions: {},

    async setAccountBook(id) {
      const accountBook = await getTargetAccountBook(id);

      this.accountBook = accountBook.data;
    },

    addPaymentMethod(data: { name: string; desc: string; color: string }) {
      this.accountBook.payments = [data, ...this.accountBook.payments];
    },

    filterTransaction(
      category: string,
      year: number,
      month: number,
      types: string[],
    ) {
      const transactions = this.getTransactionsByYearMonth(year, month);

      const typeFiltered = transactions.filter(
        (transaction: { type: string }) => {
          return types.includes(transaction.type);
        },
      );

      const categoryFiltered =
        category === 'all'
          ? typeFiltered
          : typeFiltered.filter(
              (transaction: { category: { name: string } }) => {
                return transaction.category.name === category;
              },
            );

      const transactionsGroupByDate = categoryFiltered.reduce((acc, curr) => {
        acc[curr.date] = [...(acc[curr.date] || []), curr];
        return acc;
      }, {});

      console.log(categoryFiltered);
      console.log(transactionsGroupByDate);

      this.filteredTransactions = transactionsGroupByDate;
    },

    getAllTransactions() {
      return this.accountBook.transactions;
    },

    getTransactionsByYearMonth(year: number, month: number) {
      const yearMonthDatas = this.accountBook.transactions.filter(
        item =>
          year === Number(item.date.split('-')[0]) &&
          month === Number(item.date.split('-')[1]),
      );

      return yearMonthDatas;
    },
    getTransactionsForCalendar(year: number, month: number) {
      const yearMonthDatas = this.accountBook.transactions.filter(
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
            : (priceSumData[`${date}`] = { income: item.cost, spending: 0 });
        } else {
          item.type === '지출'
            ? (priceSumData[`${date}`].spending += item.cost)
            : (priceSumData[`${date}`].income += item.cost);
        }
      });

      return priceSumData;
    },
    getSpecificTransactions(year: number, month: number, day: number) {
      const specificDatas = this.accountBook.transactions.filter(
        item =>
          year === Number(item.date.split('-')[0]) &&
          month === Number(item.date.split('-')[1]) &&
          day === Number(item.date.split('-')[2]),
      );
      return specificDatas;
    },

    getSpendingTotal(year, month) {
      let sum = 0;
      this.accountBook.transactions.forEach(item => {
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

      this.accountBook.transactions.forEach(item => {
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

      const datas = this.accountBook.transactions.filter(
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
