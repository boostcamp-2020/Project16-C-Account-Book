import createError from 'http-errors';
import { Context, Next } from 'koa';

import serviceAuthCheck from '@services/auth/check';
import serviceLogin from '@services/auth/login';

const login = async (ctx: Context): Promise<Context['body']> => {
  const tokens = await serviceLogin.login(ctx.request.body);
  ctx.body = tokens;
};

const checkToken = async (
  ctx: Context,
  next: Next,
): Promise<Context['body']> => {
  const user = await serviceAuthCheck.checkToken(ctx.header);
  console.log(`여기${user}`);
  if (!user) {
    const jwtError = createError(401, 'unauthorized');
    throw jwtError;
  }
  ctx.user = user;
  await next();
};

export default { login, checkToken };
