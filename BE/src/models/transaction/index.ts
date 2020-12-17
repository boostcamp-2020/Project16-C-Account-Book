import { TransactionModel } from './schema';

const get = async (): Promise<any> => {
  const transactions = await TransactionModel.find();
  return transactions;
};

const getExport = async (accountbookid: string): Promise<any> => {
  const transactions = await TransactionModel.find({ accountbook: accountbookid });
  return transactions;
};

const post = async (transactioninfo: any): Promise<any> => {
  const transaction = await new TransactionModel(transactioninfo).save();

  const newTransactions = {
    _id: transaction._id,
    content: transaction.content,
    type: transaction.type,
    category: transaction.category,
    cost: transaction.cost,
    payment: transaction.payment,
    accountbook: transaction.accountbook,
    date: transaction.date.toISOString().substr(0, 10),
  };

  return newTransactions;
};

const postMany = async (transactionArray: any): Promise<any> => {
  const result = await TransactionModel.insertMany(transactionArray);
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
export default { get, getExport, post, postMany, patch, del };
