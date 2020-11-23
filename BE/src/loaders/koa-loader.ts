import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import ResponseError from '@/types/error';
import apiRouter from '@/routes';

const router = new Router();

const errorCatcher = async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
};

const errorHandler = (err: ResponseError, ctx: Koa.Context) => {
  ctx.status = err.status || 500;
  ctx.body = err.message;
  console.error(`error code: [${err.status}], message: ${err.message}`);
};

const init = async (app: Koa): Promise<any> => {
  app.use(errorCatcher);
  app.use(bodyParser());
  app.use(logger());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.on('error', errorHandler);

  router.use(apiRouter.routes());
};

export default init;
