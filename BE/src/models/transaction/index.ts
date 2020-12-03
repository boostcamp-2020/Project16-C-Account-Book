import { Transaction, TransactionModel } from './schema';

const get = async (): Promise<Transaction[]> => {
  const transactions = await TransactionModel.find();
  return transactions;
};

export default { get };
