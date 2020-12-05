import { Context } from 'koa';
import service from '@services/transaction';
import { response } from '@utils/response';

const post = async (ctx: Context): Promise<Context['body']> => {
  const transaction = await service.post(ctx);
  const res = response(200, transaction.message, transaction.data);
  ctx.body = res;
  return ctx.body;
};

const patch = async (ctx: Context): Promise<Context['body']> => {
  const updateResult = await service.patch(ctx);
  ctx.body = `PATCH ${ctx.url}`;
  return ctx.body;
};

const del = (ctx: Context): Context['body'] => {
  ctx.body = `DELETE ${ctx.url}`;
  return ctx.body;
};

export default { post, patch, del };
