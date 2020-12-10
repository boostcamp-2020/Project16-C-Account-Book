import { Context } from 'koa';
import service from '@services/account-book';
import { response } from '@utils/response';

const post = async (ctx: Context): Promise<Context['body']> => {
  const result = await service.addUser(ctx);
  const res = response(200, 'success', result);
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const result = await service.delUser(ctx);
  const res = response(200, 'success', result);
  ctx.body = res;
  return ctx.body;
};

export default { post, del };
