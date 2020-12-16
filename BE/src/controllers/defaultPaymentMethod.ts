import { Context } from 'koa';
import service from '@services/defaultPaymentMethod';
import { response } from '@utils/response';

const get = async (ctx: Context): Promise<Context['body']> => {
  const defaultPaymentMethod = await service.get();

  const res = response(200, 'success', defaultPaymentMethod);
  ctx.status = res.status;
  ctx.body = res;

  return ctx.body;
};

export default { get };
