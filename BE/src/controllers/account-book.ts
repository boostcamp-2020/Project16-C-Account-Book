import { Context } from 'koa';
import service from '@/services/account-book';

const get = async (ctx: Context): Promise<Context['body']> => {
  const accountBook = await service.get(ctx);
  ctx.body = accountBook;

  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const accountBook = await service.post(ctx);
  ctx.body = accountBook;

  return ctx.body;
};

export default { get, post };
