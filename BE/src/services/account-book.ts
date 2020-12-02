import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const get = async (): Promise<any> => {
  const accountBookModels = await accountBookModel.get();

  return accountBookModels;
};

const post = async (body: Context['body']): Promise<any> => {
  await accountBookModel.create(body.name, body.description, body.userId);
};

const addTransaction = async (body: Context['body']): Promise<any> => {
  const transactionInfo = {
    content: body.content,
    type: body.type,
    category: body.category,
    cost: body.cost,
    date: body.date,
    payment: body.payment,
  };
  await accountBookModel.addTransaction(body.accountBookId, transactionInfo);
};

export default { get, post, addTransaction };
