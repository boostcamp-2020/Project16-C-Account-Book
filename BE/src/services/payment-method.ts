import accountBookModel from '@models/accountbook';
import { Context } from 'koa';

const post = async (params: any, body: any): Promise<any> => {
  const paymentMethodInfo = {
    name: body.name,
    color: body.color,
    desc: body.desc,
  };
  const paymentMethod = await accountBookModel.addPaymentMethod(params.accountbookid, paymentMethodInfo);
  if (paymentMethod) {
    return paymentMethod;
  }
  return {};
};

const patch = async (params: any, body: any): Promise<any> => {
  const accountBookId = params.accountbookid;
  const paymentMethodId = params.paymentid;
  const updateInfo = {
    _id: paymentMethodId,
    name: body.name,
    color: body.color,
    desc: body.desc,
  };
  const updateResult = await accountBookModel.updatePaymentMethod(accountBookId, paymentMethodId, updateInfo);
  return !!updateResult;
};

const del = async (params: any): Promise<any> => {
  const accountBookId = params.accountbookid;
  const paymentId = params.paymentid;
  const delResult = await accountBookModel.deletePaymentMethod(accountBookId, paymentId);
  return !!delResult;
};

export default { post, patch, del };
