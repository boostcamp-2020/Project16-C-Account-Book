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

const patch = async (ctx: Context): Promise<any> => {
  const updateResult = await accountBookModel.update(
    ctx.params.accountbookid,
    ctx.request.body.name,
    ctx.request.body.description,
  );
  return updateResult;
};

const del = async (ctx: Context): Promise<any> => {
  const deleteResult = await accountBookModel.del(ctx.params.accountbookid);
  return deleteResult;
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

export default { get, post, patch, del, addTransaction };
