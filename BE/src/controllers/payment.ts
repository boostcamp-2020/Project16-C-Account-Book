import { response } from '@utils/response';
import { Context } from 'koa';
import service from 'services/payment-method';

const post = async (ctx: Context): Promise<Context['body']> => {
  const paymentMethod = await service.post(ctx);
  const res = response(200, paymentMethod.message, paymentMethod.data);
  ctx.body = res;
  return ctx.body;
};

const patch = async (ctx: Context): Promise<Context['body']> => {
  const updateResult = await service.patch(ctx);
  const res = response(200, updateResult.message, updateResult.data);
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const delResult = await service.del(ctx);
  const res = response(200, delResult.message, delResult.data);
  ctx.body = res;
  return ctx.body;
};

export default { post, patch, del };
