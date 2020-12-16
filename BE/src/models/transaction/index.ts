import { TransactionModel } from './schema';

const get = async (): Promise<any> => {
  const transactions = await TransactionModel.find();
  return transactions;
};

const post = async (transactioninfo: any): Promise<any> => {
  const transaction = await new TransactionModel(transactioninfo).save();
  return transaction;
};

const postMany = async (transactionArray: any): Promise<any> => {
  const result = await TransactionModel.insertMany(transactionArray);
  console.log(result);
  return true;
};

const patch = async (transactionId: any, transactionInfo: any): Promise<any> => {
  const updateResult = await TransactionModel.update({ _id: transactionId }, { transactionInfo });
  return !!updateResult.nModified;
};

const del = async (transactionId: any): Promise<any> => {
  const deleteResult = await TransactionModel.deleteOne({ _id: transactionId });
  return !!deleteResult.deletedCount;
};
export default { get, post, postMany, patch, del };
