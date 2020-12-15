import { TransactionModel } from './schema';

const get = async (): Promise<any> => {
  const transactions = await TransactionModel.find();
  return transactions;
};

const post = async (transactioninfo: any): Promise<any> => {
  const transaction = await new TransactionModel(transactioninfo).save();
  return transaction;
};

export default { get, post };
