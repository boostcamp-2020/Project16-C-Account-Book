import { Context } from 'koa';

import serviceLogin from '@/services/auth/login';

import response from '@/utils/response';

const login = async (ctx: Context): Promise<Context['body']> => {
  const { body } = ctx.request;
  const tokens = await serviceLogin.login(body);
  const res = response(200, tokens);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

const refresh = async (ctx: Context): Promise<Context['body']> => {
  const { body } = ctx.request;
  const accessToken = await serviceLogin.refresh(body);
  const res = response(200, accessToken);
  ctx.status = res.status;
  ctx.body = res;
  return ctx.body;
};

export default { login, refresh };
