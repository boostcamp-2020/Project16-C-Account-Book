import { Context } from 'koa';

import serviceLogin from '@/services/auth/login';

import response from '@/utils/response';

const login = async (ctx: Context): Promise<Context['body']> => {
  const loginInfo = ctx.request.body;
  const tokens = await serviceLogin.login(loginInfo);
  const res = response(200, { ...tokens });
  ctx.status = res.status;
  ctx.body = res.data;
  return ctx.body;
};

const refresh = async (ctx: Context): Promise<Context['body']> => {
  const requestInfo = ctx.request.body;
  const accessToken = await serviceLogin.refresh(requestInfo);
  const res = response(200, { accessToken });
  ctx.status = res.status;
  ctx.body = res.data;
  return ctx.body;
};

export default { login, refresh };
