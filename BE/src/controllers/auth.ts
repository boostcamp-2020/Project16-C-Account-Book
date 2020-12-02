import createError from 'http-errors';
import { Context, Next } from 'koa';
import axios from 'axios';

import service from '@/services/auth';

const login = async (ctx: Context): Promise<Context['body']> => {
  const token = await service.login(ctx.request.body);
  console.log('token: ', token);

  ctx.body = { token };
};

const checkToken = async (
  ctx: Context,
  next: Next,
): Promise<Context['body']> => {
  const isUserInDB = await service.checkToken(ctx.header);
  if (!isUserInDB) {
    const jwtError = createError(401, 'unauthorized');
    throw jwtError;
  }
  await next();
};

export default { login, checkToken };
