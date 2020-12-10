import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const post = async (ctx: Context): Promise<any> => {
  const paymentMethodInfo = {
    name: ctx.request.body.name,
    color: ctx.request.body.color,
    desc: ctx.request.body.desc,
  };
  const paymentMethod = await accountBookModel.addPaymentMethod(
    ctx.params.accountbookid,
    paymentMethodInfo,
  );
  if (paymentMethod) {
    return {
      message: 'success',
      data: paymentMethod,
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const patch = async (ctx: Context): Promise<any> => {
  const accountBookId = ctx.params.accountbookid;
  const paymentMethodId = ctx.params.paymentid;
  const updateInfo = {
    _id: paymentMethodId,
    name: ctx.request.body.name,
    color: ctx.request.body.color,
    desc: ctx.request.body.desc,
  };
  const updateResult = await accountBookModel.updatePaymentMethod(
    accountBookId,
    paymentMethodId,
    updateInfo,
  );
  if (updateResult) {
    return {
      message: 'success',
      data: {},
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const del = async (ctx: Context): Promise<any> => {
  const accountBookId = ctx.params.accountbookid;
  const paymentId = ctx.params.paymentid;
  const delResult = await accountBookModel.deletePaymentMethod(
    accountBookId,
    paymentId,
  );
  if (delResult) {
    return {
      message: 'success',
      data: {},
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

export default { post, patch, del };
