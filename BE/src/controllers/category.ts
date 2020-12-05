import { response } from '@utils/response';
import { Context } from 'koa';
import service from '@services/category';

const post = async (ctx: Context): Promise<Context['body']> => {
  const category = await service.post(ctx);
  const res = response(200, category.message, category.data);
  ctx.body = res;
  return ctx.body;
};

const patch = async (ctx: Context): Promise<Context['body']> => {
  const updateResult = await service.patch(ctx);
  const res = response(200, updateResult.message, updateResult.data);
  ctx.body = res;
  return ctx.body;
};

const del = (ctx: Context): Context['body'] => {
  ctx.body = `DELETE ${ctx.url}`;
  return ctx.body;
};

export default { post, patch, del };
