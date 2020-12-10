import createError from 'http-errors';
import { Context, Next } from 'koa';

import serviceAuthCheck from '@services/auth/check';
import serviceLogin from '@services/auth/login';

const login = async (ctx: Context): Promise<Context['body']> => {
  const tokens = await serviceLogin.login(ctx.request.body);

  ctx.body = tokens;
};

const refresh = (ctx: Context): Context['body'] => {
  console.log(ctx.request.body);
  const token = serviceLogin.refresh(ctx.request.body);
  console.log(`new access token : ${token}`);
  ctx.body = { token };
  console.log(ctx.body);
  return ctx.body;
};

const checkToken = async (
  ctx: Context,
  next: Next,
): Promise<Context['body']> => {
  const user = await serviceAuthCheck.checkToken(ctx.header);
  if (!user) {
    const jwtError = createError(401, 'unauthorized');
    throw jwtError;
  }
  ctx.user = user;
  await next();
};

export default { login, refresh, checkToken };
