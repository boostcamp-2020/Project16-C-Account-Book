import { Context } from 'koa';

import response from '@/utils/response';

import service from '@/services/payment-method';

const post = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  console.log(params);
  const { body } = ctx.request;
  const paymentMethod = await service.post(params, body);
  const res = response(200, paymentMethod);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const patch = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const { body } = ctx.request;
  const updateResult = await service.patch(params, body);
  const res = response(200, updateResult);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const { params } = ctx;
  const delResult = await service.del(params);
  const res = response(200, delResult);
  ctx.body = res;
  return ctx.body;
};

export default { post, patch, del };
