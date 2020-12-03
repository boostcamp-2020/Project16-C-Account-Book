import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const get = async (ctx: Context): Promise<any> => {
  const accountBookModels = await accountBookModel.get(ctx.user);

  return accountBookModels;
};

const post = async (ctx: Context): Promise<any> => {
  await accountBookModel.create(
    ctx.request.body.name,
    ctx.request.body.description,
    ctx.user,
  );
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

const getDetail = async (ctx: Context): Promise<any> => {
  const accountBook = await accountBookModel.getDetail(
    ctx.params.accountbookid,
  );

  return accountBook;
};

export default { get, post, addTransaction, getDetail };
