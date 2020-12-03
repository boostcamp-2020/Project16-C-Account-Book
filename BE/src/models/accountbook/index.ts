import PaymentMethodModel from '@models/paymentmethod';
import CategoryModel from '@models/category';
import { Transaction } from '@models/transaction/schema';
import { User } from '@interfaces/auth';
import { AccountBook, AccountBookModel } from './schema';

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
): Promise<AccountBook> => {
  const defaultCategory = await CategoryModel.get();
  const information = {
    name,
    description,
    users: [users],
    categories: [...defaultCategory],
    payments: [],
    transactions: [],
  };

  const accountbook = await new AccountBookModel(information).save();
  return accountbook;
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

export default { get, create, addTransaction };
