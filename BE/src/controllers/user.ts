import { Context } from 'koa';
import service from '@/services/user';

const get = async (ctx: Context): Promise<Context['body']> => {
  const user = await service.get('asdfasdfasdf');
  ctx.body = user;
  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const userId = await service.post(ctx.request.body);
  ctx.body = userId;
  return ctx.body;
};

export default { get, post };
