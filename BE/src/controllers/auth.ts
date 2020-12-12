import createError from 'http-errors';
import { Context, Next } from 'koa';

import serviceAuthCheck from '@services/auth/check';
import serviceLogin from '@services/auth/login';

const login = async (ctx: Context): Promise<Context['body']> => {
  const tokens = await serviceLogin.login(ctx.request.body);
  ctx.body = tokens;
  return ctx.body;
};

const refresh = async (ctx: Context): Promise<Context['body']> => {
  const newAccessToken = await serviceLogin.refresh(ctx.request.body);
  ctx.body = { newAccessToken };
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
  ctx.accessToken = serviceLogin.slidingSession(user);
  ctx.user = user;
  await next();
};

export default { login, refresh, checkToken };
