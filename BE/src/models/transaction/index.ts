import { TransactionModel } from './schema';

const get = async (): Promise<any> => {
  const transactions = await TransactionModel.find();
  return transactions;
};

export default { get };
