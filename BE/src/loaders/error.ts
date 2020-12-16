import Koa from 'koa';

import ResponseError from '@/interfaces/error';
import response from '@/utils/response';

const errorCatcher = async (ctx: Koa.Context, next: () => Promise<void>): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
};

const errorHandler = (err: ResponseError, ctx: Koa.Context): void => {
  const status = err.status || 500;
  const res = response(status, { message: err.message });
  ctx.status = res.status;
  ctx.body = res;
  console.error(`error code: [${ctx.status}], message: ${err.message}`);
};

export { errorCatcher, errorHandler };
