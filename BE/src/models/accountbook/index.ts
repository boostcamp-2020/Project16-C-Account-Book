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

const getDetail = async (id: string): Promise<any> => {
  const accountBook = await AccountBookModel.findOne({
    _id: id,
  });
  return accountBook;
};

const create = async ({
  name,
  description,
  user,
}: {
  name: string;
  description: string;
  user: User;
}): Promise<AccountBook> => {
  const defaultCategory = await CategoryModel.get();
  const information = {
    name,
    description,
    user,
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

export default { get, getDetail, create, update, del, addTransaction };
