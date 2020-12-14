import CategoryModel from '@models/category';
import { User } from '@interfaces/auth';
import AccountBook from '@interfaces/accountbook';
import Transaction from '@interfaces/transaction';
import { AccountBookDoc, AccountBookModel } from './schema';
import { TransactionDoc } from '../transaction/schema';

const get = async ({
  userid,
  social,
}: {
  userid: string;
  social: string;
}): Promise<AccountBookDoc[]> => {
  const accountBooks = await AccountBookModel.find({
    'users.userid': userid,
    'users.social': social,
  });
  return accountBooks;
};

const getDetail = async (id: string): Promise<any> => {
  const accountBook = await AccountBookModel.findOne().where(`_id`).equals(id);
  return accountBook;
};

const getTransactions = async (
  id: string,
  year: string,
  month: string,
): Promise<any> => {
  const accountBook = await AccountBookModel.findOne()
    .where('_id')
    .equals(id)
    .gte(`transactions.date`, new Date(`${year}-${month}-01`))
    .lte(`transactions.date`, new Date(`${year}-${month}-31`));
  if (accountBook) {
    const transactions = accountBook.transactions.map(t => {
      const { _id, content, type, category, cost, date, payment } = t;
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = d.getMonth().toString().padStart(2, '0');
      const dd = d.getDate().toString().padStart(2, '0');
      const newdate = `${yyyy}-${mm}-${dd}`;
      const ret = {
        _id,
        content,
        type,
        category,
        cost,
        date: newdate,
        payment,
      };
      return ret;
    });
    const newAccountBook = {
      _id: accountBook._id,
      code: accountBook.code,
      startday: accountBook.startday,
      description: accountBook.description,
      name: accountBook.name,
      users: accountBook.users,
      categories: accountBook.categories,
      payments: accountBook.payments,
      transactions,
    };
    console.log(newAccountBook);
    return newAccountBook;
  }
};

const create = async ({
  name,
  description,
  user,
}: {
  name: string;
  description: string;
  user: User;
}): Promise<any> => {
  const defaultCategory = await CategoryModel.get();
  const information = {
    name,
    startday: 'SUN',
    description,
    users: [user],
    categories: [...defaultCategory],
    payments: [],
    transactions: [],
  };

  const accountbook = await new AccountBookModel(information).save();
  return accountbook;
};

const update = async (
  _id: string,
  {
    name,
    description,
  }: {
    name: string;
    description: string;
  },
): Promise<any> => {
  const updateData = {
    name,
    description,
  };

  const updateResult = await AccountBookModel.updateOne({ _id }, updateData);
  return !!updateResult.nModified;
};

const updateCode = async (_id: string, code: string): Promise<any> => {
  const updateData = { code };
  const updateResult = await AccountBookModel.updateOne({ _id }, updateData);
  if (updateResult.nModified) {
    const accountBookData = await AccountBookModel.findOne({ _id });
    return accountBookData;
  }
  return !!updateResult.nModified;
};

const updateStartday = async (
  _id: string,
  {
    startday,
  }: {
    startday: string;
  },
): Promise<any> => {
  const updateData = {
    startday,
  };

  const updateResult = await AccountBookModel.updateOne({ _id }, updateData);
  return !!updateResult.nModified;
};

const del = async (_id: string): Promise<any> => {
  const deleteResult = await AccountBookModel.deleteOne({ _id });
  return !!deleteResult.deletedCount;
};

const addTransaction = async (
  accountBookId: string,
  transaction: any,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const newTransactions = [...curAccountBook.transactions, transaction];
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { transactions: newTransactions },
    );
    if (updateResult.nModified) {
      return newTransactions[newTransactions.length - 1];
    }
    return false;
  }
  return false;
};

const addTransactions = async (
  accountBookId: string,
  transactionArray: any,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const curTransactions = curAccountBook.transactions;
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { transactions: [...curTransactions, ...transactionArray] },
    );
    if (updateResult.nModified) {
      return true;
    }
    return false;
  }
  return false;
};

const updateTransaction = async (
  accountBookId: string,
  transactionId: string,
  updateInfo: any,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const index = curAccountBook.transactions
      .map(value => value._id)
      .indexOf(transactionId);
    curAccountBook.transactions[index] = updateInfo;
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { transactions: curAccountBook.transactions },
    );
    if (updateResult.nModified) {
      return true;
    }
    return false;
  }
  return false;
};

const deleteTransaction = async (
  accountBookId: string,
  transactionId: string,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const index = curAccountBook.transactions
      .map(value => value._id)
      .indexOf(transactionId);
    curAccountBook.transactions.splice(index, 1);
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { transactions: curAccountBook.transactions },
    );
    if (updateResult.nModified) {
      return true;
    }
    return false;
  }
  return false;
};

const addPaymentMethod = async (
  accountBookId: string,
  paymentMethod: any,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const curPaymentMethod = curAccountBook.payments;
    curPaymentMethod.push(paymentMethod);
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { payments: curPaymentMethod },
    );
    if (updateResult) {
      return curPaymentMethod[curPaymentMethod.length - 1];
    }
    return false;
  }
  return false;
};

const updatePaymentMethod = async (
  accountBookId: string,
  paymentMethodId: string,
  updateInfo: any,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const curPayments = curAccountBook.payments;
    const index = curPayments.map(value => value._id).indexOf(paymentMethodId);
    curPayments[index] = updateInfo;
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { payments: curPayments },
    );
    if (updateResult.nModified) return true;
    return false;
  }
  return false;
};

const deletePaymentMethod = async (
  accountBookId: string,
  paymentMethodId: string,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const curPayments = curAccountBook.payments;
    const index = curPayments.map(value => value._id).indexOf(paymentMethodId);
    curPayments.splice(index, 1);
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { payments: curPayments },
    );
    if (updateResult.nModified) return true;
    return false;
  }
  return false;
};

const addCategory = async (
  accountBookId: string,
  categoryInfo: any,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const curCategory = curAccountBook.categories;
    curCategory.push(categoryInfo);
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { categories: curCategory },
    );
    if (updateResult.nModified) {
      return curCategory[curCategory.length - 1];
    }
    return false;
  }
  return false;
};

const updateCategory = async (
  accountBookId: string,
  categoryInfo: any,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const curCategory = curAccountBook.categories;
    const index = curCategory.map(value => value._id).indexOf(categoryInfo._id);
    curCategory[index] = categoryInfo;
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { categories: curCategory },
    );
    if (updateResult) return true;
    return false;
  }
  return false;
};

const deleteCategory = async (
  accountBookId: string,
  categoryId: string,
): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id: accountBookId });
  if (curAccountBook) {
    const curCategory = curAccountBook.categories;
    const index = curCategory.map(value => value._id).indexOf(categoryId);
    curCategory.splice(index, 1);
    const updateResult = await AccountBookModel.update(
      { _id: accountBookId },
      { categories: curCategory },
    );
    if (updateResult) return true;
    return false;
  }
  return false;
};

const addUser = async (code: string, userInfo: any): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ code });
  if (curAccountBook) {
    const curUser = curAccountBook.users;
    const id = curAccountBook._id;
    curUser.push(userInfo);
    const updateResult = await AccountBookModel.update(
      { code },
      { users: curUser },
    );
    if (updateResult.nModified) {
      const accountBooks = await AccountBookModel.find(
        { _id: id },
        '_id name description',
      );
      return accountBooks;
    }
    return false;
  }
  return false;
};

const delUser = async (_id: string, userInfo: any): Promise<any> => {
  const curAccountBook = await AccountBookModel.findOne({ _id });
  if (curAccountBook) {
    const newUsers = curAccountBook.users.filter(
      value => value.userid !== userInfo.userid,
    );
    const updateResult = await AccountBookModel.update(
      { _id },
      { users: newUsers },
    );
    if (updateResult.nModified) return true;
    return false;
  }
  return false;
};

export default {
  get,
  getDetail,
  create,
  update,
  updateStartday,
  del,
  addTransaction,
  addTransactions,
  updateTransaction,
  deleteTransaction,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCode,
  addUser,
  delUser,
  getTransactions,
};
