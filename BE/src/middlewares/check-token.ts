import createError from 'http-errors';
import { Context, Next } from 'koa';

import authCheckService from '@/services/auth/check';
import loginService from '@/services/auth/login';

const checkToken = async (ctx: Context, next: Next): Promise<Context['body']> => {
  const user = await authCheckService.checkToken(ctx.header);
  if (!user) {
    const jwtError = createError(401, 'unauthorized');
    throw jwtError;
  }
  ctx.accessToken = loginService.slidingSession(user);
  ctx.user = user;
  await next();
};

export default { checkToken };
