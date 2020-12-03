import PaymentMethodModel from '@models/paymentmethod';
import CategoryModel from '@models/category';
import { Transaction } from '@models/transaction/schema';
import { AccountBook, AccountBookModel } from './schema';
import { User } from '../user/schema';

const get = async ({
  id,
  social,
}: {
  id: string;
  social: string;
}): Promise<AccountBook[]> => {
  const accountBooks = await AccountBookModel.find({
    'users.id': id,
    'users.social': social,
  });
  return accountBooks;
};

const create = async (
  name: string,
  description: string | undefined,
  users: User,
): Promise<any> => {
  const defaultCategory = await CategoryModel.get();
  const defaultPaymentMethod = await PaymentMethodModel.get();
  const accountbook = {
    name,
    description,
    users: users,
    categories: [...defaultCategory],
    payments: [...defaultPaymentMethod],
    transactions: [],
  };

  let result = await new AccountBookModel(accountbook);
  result = await result.save();
};

const addTransaction = async (
  accountBookId: string,
  transaction: any,
): Promise<any> => {
  const id = accountBookId;
  const curAccountBook = await AccountBookModel.findOne({ _id: id });
  if (curAccountBook) {
    const curTransactions = [...curAccountBook.transactions];
    curTransactions.push(transaction);
    const updateResult = await AccountBookModel.update(
      { _id: id },
      { transactions: curTransactions },
    );
    console.log(updateResult);
  } else {
    console.log(`존재하지 않는 가계부`);
  }
};

const getDetail = async ({
  accountbookid,
}: {
  accountbookid: string;
}): Promise<any> => {
  const accountBooks = await AccountBookModel.findOne({ _id: accountbookid });
  return accountBooks;
};

export default { get, create, addTransaction, getDetail };
