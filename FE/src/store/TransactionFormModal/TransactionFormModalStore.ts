import { iTransaction } from '@interfaces/transaction';
import { iSetTransactionAddModalVisible } from '@interfaces/transaction-form-modal-store';
import { createTransaction, updateTransaction } from '../../api/transaction';

export const createStore = () => {
  const store = {
    transactionAddModalVisible: false,
    messageVisible: false,
    input: {
      _id: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      type: '지출',
      category: {},
      payment: {},
      cost: 0,
      content: '',
    },
    message: '',

    initInput() {
      this.input = {
        _id: '',
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        type: '지출',
        category: {},
        payment: {},
        cost: 0,
        content: '',
      };
      this.message = '';
    },

    setMessageVisible(visible: boolean) {
      this.messageVisible = visible;
    },

    setMessage(text: string) {
      this.message = text;
    },

    setTransactionAddModalVisible(visible: boolean): void {
      this.transactionAddModalVisible = visible;
    },

    setInput(transactionFormInput: any) {
      this.input = transactionFormInput;
    },

    async submitPost(accountbookId: string) {
      const { year, month, day } = this.input;

      const date = `${year}-${month
        .toString()
        .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      const newTransaction = { ...this.input, date };

      try {
        const { status, data } = await createTransaction(
          accountbookId,
          newTransaction,
        );
        if (status !== 200) throw new Error();

        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async submitUpdate(accountbookId: string) {
      const { year, month, day } = this.input;

      const date = `${year}-${month
        .toString()
        .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      const newTransaction = { ...this.input, date };

      try {
        const { status } = await updateTransaction(
          accountbookId,
          newTransaction,
        );
        if (status !== 200) throw new Error();

        return newTransaction;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
