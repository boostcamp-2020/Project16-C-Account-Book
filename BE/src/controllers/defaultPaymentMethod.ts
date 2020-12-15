import { Context } from 'koa';

import service from '@/services/defaultPaymentMethod';

import response from '@/utils/response';

const get = async (ctx: Context): Promise<Context['body']> => {
  const defaultPaymentMethods = await service.get();
  const res = response(200, { defaultPaymentMethods });
  ctx.status = res.status;
  ctx.body = res.data;

  return ctx.body;
};

export default { get };
