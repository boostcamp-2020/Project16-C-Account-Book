import CategoryModel from '@models/category';
import { User } from '@interfaces/auth';
import AccountBook from '@interfaces/accountbook';
import { AccountBookModel } from './schema';

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

const update = async (
  _id: string,
  name: string,
  description: string | undefined,
): Promise<any> => {
  const updateData = {
    name,
    description,
  };

  const updateResult = await AccountBookModel.update({ _id }, updateData);
  return !!updateResult.ok;
};

const del = async (_id: string): Promise<any> => {
  const deleteResult = await AccountBookModel.deleteOne({ _id });
  return !!deleteResult.deletedCount;
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

export default { get, create, update, del, addTransaction };
