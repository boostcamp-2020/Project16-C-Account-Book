import { Context } from 'koa';
import service from '@/services/account-book';

const get = async (ctx: Context): Promise<Context['body']> => {
  const accountBook = await service.get();
  ctx.body = accountBook;

  return ctx.body;
};

export default { get };
