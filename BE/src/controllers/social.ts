import { Context } from 'koa';

import service from '@/services/account-book';

import response from '@/utils/response';

const post = async (ctx: Context): Promise<Context['body']> => {
  const userInfo = ctx.user;
  const codeInfo = ctx.request.body;
  const accountBook = await service.addUser(codeInfo, userInfo);
  const res = response(200, { accountBook });
  ctx.status = res.status;
  ctx.body = res.data;
  return ctx.body;
};

const del = async (ctx: Context): Promise<Context['body']> => {
  const userInfo = ctx.user;
  const paramInfo = ctx.params;
  const result = await service.delUser(paramInfo, userInfo);
  const res = response(200, { result });
  ctx.status = res.status;
  ctx.body = res.data;
  return ctx.body;
};

export default { post, del };
