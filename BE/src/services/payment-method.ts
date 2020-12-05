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

const patch = async (ctx: Context): Promise<any> => {};

const del = async (ctx: Context): Promise<any> => {};

export default { post, patch, del };
