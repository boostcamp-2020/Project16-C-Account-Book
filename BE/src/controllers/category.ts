import { Context } from 'koa';
import response from '@/utils/response';
import service from '@/services/category';

const post = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx.params;
  const { body } = ctx.request.body;
  const category = await service.post(params, body);
  const res = response(200, { category });
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const patch = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx.params;
  const { body } = ctx.request.body;
  const updateResult = await service.patch(params, body);
  const res = response(200, { updateResult });
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx.params;
  const delResult = await service.del(params);
  const res = response(200, { delResult });
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

export default { post, patch, del };
