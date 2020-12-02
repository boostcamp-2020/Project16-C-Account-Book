import createError from 'http-errors';
import { Context, Next } from 'koa';
import axios from 'axios';

import serviceAuthCheck from '@/services/auth/check';
import serviceLogin from '@/services/auth/login';

const login = async (ctx: Context): Promise<Context['body']> => {
  const token = await serviceLogin.login(ctx.request.body);
  console.log('token: ', token);

  ctx.body = { token };
};

const checkToken = async (
  ctx: Context,
  next: Next,
): Promise<Context['body']> => {
  const isUserInDB = await serviceAuthCheck.checkToken(ctx.header);
  if (!isUserInDB) {
    const jwtError = createError(401, 'unauthorized');
    throw jwtError;
  }
  await next();
};

export default { login, checkToken };
