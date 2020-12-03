import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const get = async (ctx: Context): Promise<any> => {
  const accountBooks = await accountBookModel.get(ctx.user);
  return accountBooks;
};

const post = async (ctx: Context): Promise<any> => {
  const accountBook = await accountBookModel.create(
    ctx.request.body.name,
    ctx.request.body.description,
    ctx.user,
  );
  return accountBook;
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
