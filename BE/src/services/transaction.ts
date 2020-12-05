import accountBookModel from '@models/accountbook';
import { Context } from 'vm';

const post = async (ctx: Context): Promise<any> => {
  const transactionInfo = {
    content: ctx.request.body.content,
    type: ctx.request.body.type,
    category: ctx.request.body.category,
    cost: ctx.request.body.cost,
    date: ctx.request.body.date,
    payment: ctx.request.body.payment,
  };
  const transaction = await accountBookModel.addTransaction(
    ctx.params.accountbookid,
    transactionInfo,
  );
  if (transaction) {
    return {
      message: 'success',
      data: transaction,
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const patch = async (ctx: Context): Promise<any> => {
  const accountBookId = ctx.params.accountbookid;
  const transactionId = ctx.params.transactionid;
  const updateInfo = {
    _id : transactionId,
    content: ctx.request.body.content,
    type: ctx.request.body.type,
    category: ctx.request.body.category,
    cost: ctx.request.body.cost,
    date: ctx.request.body.date,
    payment: ctx.request.body.payment,
  };
  const updateResult = await accountBookModel.updateTransaction(
    accountBookId,
    transactionId,
    updateInfo,
  );
  if(updateResult) {
    return {
      message : 'success',
      data : {}
    }
  }
  return {
    message : 'fail',
    data : {}
  }
};

export default { post, patch };
