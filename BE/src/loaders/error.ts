import Koa from 'koa';

import ResponseError from '@/types/error';

const errorCatcher = async (
  ctx: Koa.Context,
  next: () => Promise<void>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
};

const errorHandler = (err: ResponseError, ctx: Koa.Context): void => {
  ctx.status = err.status || 500;
  ctx.body = { message: err.message };
  console.error(`error code: [${ctx.status}], message: ${err.message}`);
};

export { errorCatcher, errorHandler };
