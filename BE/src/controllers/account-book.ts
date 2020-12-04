import { Context } from 'koa';
import service from '@services/account-book';
import { response } from '@utils/response';

const get = async (ctx: Context): Promise<Context['body']> => {
  const accountBooks = await service.get(ctx);
  const res = response(200, 'success', accountBooks);
  ctx.status = res.status;
  ctx.body = res;

  return ctx.body;
};

const post = async (ctx: Context): Promise<Context['body']> => {
  const accountBook = await service.post(ctx);
  const res = response(200, 'success', accountBook);
  ctx.status = res.status;
  ctx.body = res;

  return ctx.body;
};

const update = async (ctx: Context): Promise<Context['body']> => {
  const updateResult = await service.patch(ctx);
  const res = response(200, updateResult.message, updateResult.data);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const deleteResult = await service.del(ctx);
  const res = response(200, 'success', deleteResult);
  ctx.status = res.status;
  ctx.body = res;

  return ctx.body;
};

const getDetail = async (ctx: Context): Promise<Context['body']> => {
  const accountBook = await service.getDetail(ctx);
  const res = response(200, 'success', accountBook);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};
export default { get, post, update, del, getDetail };
