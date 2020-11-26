import createError from 'http-errors';
import { Context } from 'koa';
import axios from 'axios';

import service from '@/services/auth';

const login = async (ctx: Context): Promise<Context['body']> => {
  const token = await service.login(ctx.request.body);
  console.log('token: ', token);

  ctx.body = { token };
};

export default { login };
