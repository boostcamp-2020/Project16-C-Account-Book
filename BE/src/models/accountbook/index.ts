import PaymentMethod from '@models/paymentmethod';
import Category from '@models/category';
import { AccountBook, AccountBookModel } from './schema';

const get = async (): Promise<AccountBook[]> => {
  const accountBooks = await AccountBookModel.find();
  return accountBooks;
};

const create = async (
  name: string,
  description: string | undefined,
  users: [string],
): Promise<any> => {
  const defaultCategory = await Category.get();
  const defaultPaymentMethod = await PaymentMethod.get();
  const accountbook = {
    name,
    description,
    users: [...users],
    categories: [...defaultCategory],
    payments: [...defaultPaymentMethod],
    transactions: [],
  };

  let result = await new AccountBookModel(accountbook);
  result = await result.save();
};

export default { get, create };
