import { Context } from 'koa';
import service from '@services/user';
import response from '@utils/response';

const get = async (ctx: Context): Promise<Context['body']> => {
  const { body } = ctx.request;
  const user = await service.get(body);
  const res = response(200, user);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const { body } = ctx.request;
  const userId = await service.post(body);
  const res = response(200, userId);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

export default { get, post };
