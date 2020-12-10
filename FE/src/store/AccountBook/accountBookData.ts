import { getTargetAccountBook } from '../../api/accoun-book-list';

export const createStore = () => {
  const store = {
    accountBook: {
      _id: null,
      code: null,
      name: null,
      startday: null,
      description: null,
      categories: [],
      payments: [],
      users: [],
      transactions: [],
    },

    filteredTransactions: {},

    filteredPriceIn: 0,

    filteredPriceOut: 0,

    addTransaction(transaction) {
      this.accountBook.transactions = [
        ...this.accountBook.transactions,
        transaction,
      ];
    },

    updateTransaction(transaction) {
      const rest = this.accountBook.transactions.filter(
        item => item._id !== transaction._id,
      );

      this.accountBook.transactions = [...rest, transaction];
    },

    deleteTransaction(id) {
      this.accountBook.transactions = this.accountBook.transactions.filter(
        ({ _id }) => id !== _id,
      );
    },

    async setAccountBook(id) {
      const accountBook = await getTargetAccountBook(id);
      accountBook.data.payments.reverse();
      this.accountBook = accountBook.data;
    },

    addPaymentMethod(data: { name: string; desc: string; color: string }) {
      this.accountBook.payments = [data, ...this.accountBook.payments];
    },

    updatePaymentMethod(data: { id: string; desc: string }) {
      const updatedPayments = [...this.accountBook.payments];
      updatedPayments = updatedPayments.map(item => {
        if (item._id === data.id) {
          item = { ...item, desc: data.desc };
        }
        return item;
      });
      this.accountBook.payments = updatedPayments;
    },

    deletePaymentMethod(id) {
      this.accountBook.payments = this.accountBook.payments.filter(
        payment => payment._id !== id,
      );
    },

    initPrices() {
      this.filteredPriceIn = 0;
      this.filteredPriceOut = 0;
    },

    filterTransaction(
      categories: string[],
      year: number,
      month: number,
      types: string[],
    ) {
      const transactions = this.getTransactionsByYearMonth(year, month);

      const categoryFiltered =
        categories.length === 0
          ? transactions
          : transactions.filter(
              (transaction: { category: { name: string } }) => {
                return categories.includes(transaction.category.name);
              },
            );

      this.initPrices();
      categoryFiltered.forEach(transaction => {
        if (transaction.type === '지출') {
          this.filteredPriceOut += transaction.cost;
        } else if (transaction.type === '수입') {
          this.filteredPriceIn += transaction.cost;
        }
      });

      const typeFiltered =
        types.length === 0
          ? categoryFiltered
          : categoryFiltered.filter((transaction: { type: string }) => {
              return types.includes(transaction.type);
            });

      const transactionsGroupByDate = typeFiltered.reduce((acc, curr) => {
        acc[curr.date] = [...(acc[curr.date] || []), curr];
        return acc;
      }, {});

      this.filteredTransactions = transactionsGroupByDate;
    },

    getAllTransactions() {
      return this.accountBook.transactions;
    },

    getTransactionsByYearMonth(year: number, month: number) {
      const yearMonthDatas = this.accountBook.transactions?.filter(
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

    getIncomeCategories() {
      return this.accountBook.categories.filter(item => item.type === '수입');
    },
    getSpendingCategories() {
      return this.accountBook.categories.filter(item => item.type === '지출');
    },
    createCategories(data: { name: string; icon: number; type: string }) {
      this.accountBook.categories = [...this.accountBook.categories, data];
    },
    updateCategory(data: {
      categoryId: string;
      name: string;
      icon: number;
      type: string;
    }) {
      this.accountBook.categories = this.accountBook.categories.map(item => {
        if (item._id === data.categoryId) {
          item = { ...item, name: data.name, icon: data.icon, type: data.type };
        }
        return item;
      });
    },
    deleteCategory(data: { categoryId: string }) {
      this.accountBook.categories = this.accountBook.categories.filter(
        item => item._id !== data.categoryId,
      );
    },
    getPaymentByName(name: string) {
      return this.accountBook.payments.find(payment => payment.name === name);
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
