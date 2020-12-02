import transactionModel from '@/models/transaction';
import { Context } from 'koa';

const get = async (): Promise<Array<transaction>> => {
  const transactions = await transactionModel.find();
  return transactions;
};

export default { get };
